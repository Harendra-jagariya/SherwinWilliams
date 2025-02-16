from fastapi import FastAPI, UploadFile, File, HTTPException
import uvicorn
import shutil
from pathlib import Path
# Import AI processing modules (to be implemented later)
from app.services.segmentation import segment_walls
from app.services.color_blending import apply_paint
from app.services.recommender import recommend_colors

app = FastAPI()

UPLOAD_DIR = Path("uploads")
UPLOAD_DIR.mkdir(exist_ok=True)

@app.get("/")
def home():
    return {"message": "Welcome to AI Virtual Painter Backend"}

@app.post("/upload/")
def upload_image(file: UploadFile = File(...)):
    file_path = UPLOAD_DIR / file.filename
    with file_path.open("wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    return {"filename": file.filename, "message": "File uploaded successfully"}

@app.post("/process-image/")
def process_image(file: UploadFile = File(...), color: str = "#FF5733"):
    file_path = UPLOAD_DIR / file.filename
    with file_path.open("wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    # AI Processing Steps
    segmented_image = segment_walls(file_path)
    painted_image = apply_paint(segmented_image, color)
    
    return {"filename": file.filename, "message": "Image processed successfully"}

@app.get("/recommend-colors/")
def get_color_recommendations():
    colors = recommend_colors()
    return {"recommended_colors": colors}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
