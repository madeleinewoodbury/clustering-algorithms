from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import clustering
import os
from dotenv import load_dotenv

load_dotenv()
app = FastAPI()

CORS_ORIGINS = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(clustering.router)

@app.get("/")
async def root():
    return {"message": "Clustering Algorithms API is up and running!"}

