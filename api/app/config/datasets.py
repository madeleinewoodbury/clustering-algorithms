from enum import Enum
from sklearn.datasets import load_wine, load_iris, load_breast_cancer, load_digits

class DatasetType(Enum):
    BREAST_CANCER = 'breast_cancer'
    DIGITS = 'digits'
    IRIS = 'iris'
    WINE = 'wine'

class DatasetList:
    def __init__(self):
        self.datasets = {
            DatasetType.BREAST_CANCER: "Breast cancer dataset",
            DatasetType.DIGITS: "Handwritten digits dataset.",
            DatasetType.IRIS: "Iris flower dataset",
            DatasetType.WINE: "Wine recognition dataset",
        }

    def contains(self, name) -> bool:
        for dataset in self.datasets:
            if name == dataset.value:
                return True

        return False

    def load_dataset(self, dataset: str):
        if not self.contains(dataset):
            return None

        if dataset == DatasetType.WINE.value:
            return load_wine()
        if dataset == DatasetType.IRIS.value:
            return load_iris()
        if dataset == DatasetType.BREAST_CANCER.value:
            return load_breast_cancer()
        if dataset == DatasetType.DIGITS.value:
            return load_digits()

        return None

datasets = DatasetList()
