import torch
import cv2
import numpy as np
from flask import Flask, request, send_file
from io import BytesIO
import os

app = Flask(__name__)

# Cargar el modelo YOLO
model = torch.hub.load('ultralytics/yolov5', 'custom', path='yolov5s.pt')

@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return {'error': 'No file provided'}, 400
    
    file = request.files['file']
    if file.filename == '':
        return {'error': 'No file selected'}, 400

    # Obtener la extensión del archivo
    filename = file.filename
    ext = filename.split('.')[-1].lower()

    if ext in ['jpg', 'jpeg', 'png']:
        return process_image(file)
    elif ext in ['mp4', 'avi', 'mov']:
        return process_video(file)
    else:
        return {'error': 'Unsupported file type'}, 400

def process_image(file):
    img_bytes = file.read()
    np_img = np.frombuffer(img_bytes, np.uint8)
    img = cv2.imdecode(np_img, cv2.IMREAD_COLOR)
    
    # Realizar la detección
    results = model(img)
    
    # Dibujar los cuadros delimitadores en la imagen
    for *box, conf, cls in results.xyxy[0]:
        x1, y1, x2, y2 = map(int, box)
        label = f'{model.names[int(cls)]} {conf:.2f}'
        cv2.rectangle(img, (x1, y1), (x2, y2), (0, 255, 0), 2)
        cv2.putText(img, label, (x1, y1 - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.9, (0, 255, 0), 2)
    
    _, img_encoded = cv2.imencode('.jpg', img)
    return send_file(BytesIO(img_encoded.tobytes()), mimetype='image/jpeg')

def process_video(file):
    # Guardar video a un archivo temporal
    temp_input_file = 'input_video.mp4'
    with open(temp_input_file, 'wb') as f:
        f.write(file.read())
    
    # Leer el video
    cap = cv2.VideoCapture(temp_input_file)
    
    # Obtener propiedades del video
    fourcc = cv2.VideoWriter_fourcc(*'mp4v')
    fps = cap.get(cv2.CAP_PROP_FPS)
    width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    
    # Reducir la resolución del video
    target_width = 640
    target_height = int(height * (target_width / width))
    if width > target_width:
        width = target_width
        height = target_height
    
    # Crear un VideoWriter para el video de salida
    temp_output_file = 'output_video.mp4'
    out = cv2.VideoWriter(temp_output_file, fourcc, fps, (width, height))

    # Definir cap en el alcance del bucle
    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break
        
        # Redimensionar el cuadro
        frame = cv2.resize(frame, (width, height))
        
        # Realizar la detección
        results = model(frame)
        
        # Dibujar los cuadros delimitadores en el cuadro del video
        print("Detections:", results)  # Imprimir las detecciones para debug
        for detection in results.xyxy[0]:
            x1, y1, x2, y2, conf, cls = detection.tolist()
            label = f'{model.names[int(cls)]} {conf:.2f}'
            x1, y1, x2, y2 = int(x1), int(y1), int(x2), int(y2)  # Convertir a enteros
            cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 255, 0), 2)
            cv2.putText(frame, label, (x1, y1 - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.9, (0, 255, 0), 2)

        # Escribir el cuadro procesado al video de salida
        out.write(frame)

    cap.release()
    out.release()

    # Leer el video de salida y enviarlo como respuesta
    with open(temp_output_file, 'rb') as f:
        output_video_bytes = f.read()

    # Eliminar archivos temporales
    os.remove(temp_input_file)
    os.remove(temp_output_file)

    return send_file(BytesIO(output_video_bytes), mimetype='video/mp4')



if __name__ == '__main__':
    app.run(debug=True)
