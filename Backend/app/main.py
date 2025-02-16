from fastapi import FastAPI
from app.routes.image_processing import router as image_router
from app.routes.health import router as health_router

app = FastAPI(title="AI Virtual Painter Backend", version="1.0")

# Register API routes
app.include_router(image_router, prefix="/api")
app.include_router(health_router, prefix="/api")

@app.get("/")
def home():
    return {"message": "AI Virtual Painter Backend is running 🚀"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)