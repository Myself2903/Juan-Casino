from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from Controller.Login import router as login_router
from Controller.Profile import router as profile_router
from Controller.RegisterUser import router as register_router

app = FastAPI()

#url allowed to query
origins = [
    "http://localhost",
    "http://localhost:5173",
    'https://juan-casino-69424f.netlify.app/',
]


#add origins to router
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(login_router)
app.include_router(profile_router)
app.include_router(register_router)

@app.get("/")
def read_root():
    return{"Hello": "World"}

