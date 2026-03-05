from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"status":"API rodando"}

@app.get("/clientes")
def clientes():
    return [
        {"id":1,"nome":"João"},
        {"id":2,"nome":"Maria"},
        {"id":3,"nome":"Carlos"}
    ]