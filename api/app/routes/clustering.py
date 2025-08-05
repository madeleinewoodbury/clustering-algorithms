from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.decomposition import PCA
from app.config.datasets import datasets
from app.config.algorithms import algorithms
router = APIRouter()

class Clustering(BaseModel):
    algorithm: str
    dataset: str
    use_pca: bool

@router.post("/cluster")
async def cluster(request: Clustering):
    algorithm = request.algorithm
    dataset = request.dataset
    use_pca = request.use_pca

    if not algorithms.contains(algorithm):
        raise HTTPException(status_code=404, detail="Algorithm not found")

    if not datasets.contains(dataset):
        raise HTTPException(status_code=404, detail="Dataset not found")

    data = datasets.load_dataset(dataset)
    if data is None:
        raise HTTPException(status_code=404, detail="Dataset not found")

    df = pd.DataFrame(data.data, columns=data.feature_names)

    # standardize the data
    scaler = StandardScaler()
    x_scaled = scaler.fit_transform(df)

    model = algorithms.get_cluster_model(algorithm)
    if model is None:
        raise HTTPException(status_code=404, detail="Model not found")

    if use_pca:
        pca = PCA(n_components=2)
        x_pca = pca.fit_transform(x_scaled)
        labels = model.fit_predict(x_pca)

        return {
            'labels': labels.tolist(),
            'data': x_pca.tolist(),
            'feature_names': ['PC1', 'PC2']
        }
    else:
        labels = model.fit_predict(x_scaled)

        return {
            'labels': labels.tolist(),
            'data': x_scaled.tolist(),
            'feature_names': df.columns.tolist(),
        }

@router.get("/cluster/algorithms")
async def get_algorithms():
    return algorithms

@router.get("/cluster/dataset")
async def get_dataset():
    return datasets






