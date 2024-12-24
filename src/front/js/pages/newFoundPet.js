import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import Cloudinary from "../component/cloudinary";
import UbicationMap from "../component/ubication_map";

const NewFoundPet = () => {
  const navigate = useNavigate();
  const { store, actions } = useContext(Context)

  const [newPet, setNewPet] = useState({
    "name": "Encontrado",
    "species": "",
    "breed": "",
    "color": "",
    "gender": "",
    "description": "",
    "photo_1": "",
    "photo_2": "",
    "photo_3": "",
    "photo_4": "",
    "event_date": "",
    "zone": "",
    "longitude": "-56.159328",
    "latitude": "-34.895992",
    "pet_status": "find"
  });

  function handleChange(e) {
    setNewPet({
      ...newPet, [e.target.id]: e.target.value
    })
  }

  console.log(newPet);


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("enviando post", newPet);
    actions.addNewPet(newPet, navigate);
     };

  return (
    <div className="container col-sm-10, col-md-8, col-lg-6 border rounded pet-form bg-light p-4">
      <div className="container ">
        <p className="post-title text-center">Información de la mascota encontrada</p>
      </div>
      <div className=" container p-2 ">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="species" className="form-label">ESPECIE</label>
            <select className="form-select" id="species" aria-label="select species" value={newPet.species} required onChange={handleChange} >
              <option value="" disabled selected>Selecciona</option>
              <option value="perro">Perro</option>
              <option value="gato">Gato</option>
              <option value="conejo">Conejo</option>
              <option value="ave">Ave</option>
              <option value="reptil">Reptil</option>
              <option value="otro">Otro</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="breed" className="form-label">RAZA</label>
            <input type="text" className="form-control" id="breed" placeholder="Ingresa la raza de tu mascota" value={newPet.breed} required onChange={handleChange} />
          </div>
          <div className="row g-3 mb-3 ">
            <div className="col-md-6">
              <label htmlFor="gender" className="form-label">GENERO</label>
              <select className="form-select" id="gender" aria-label="Selecionar genero" required onChange={handleChange} >
                <option value="" disabled selected>Selecciona</option>
                <option value="male">Macho</option>
                <option value="female">Hembra</option>
                
              </select>
            </div>
            <div className="col-md-6">
              <label htmlFor="color" className="form-label">COLOR</label>
              <input type="text" className="form-control" id="color" placeholder="Ingresa el color" value={newPet.color} required onChange={handleChange} />
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">DESCRIPCION</label>
            <textarea className="form-control" id="description" rows="3" value={newPet.description} required onChange={handleChange}></textarea>
          </div>
          <Cloudinary
            updatePhotos={(image) => setNewPet((prev) => ({
              ...prev,
              photo_1: image[0] || "",
              photo_2: image[1] || "",
              photo_3: image[2] || "",
              photo_4: image[3] || "",
            }))
            }
          />
          <div className="d-block mb-3">
            <label htmlFor="date" className="form-label ">¿CUANDO LO ENCONTRASTE?</label>
            <input type="date" className="form-control" id="event_date" value={newPet.event_date} required onChange={handleChange} />
          </div>
          <div className="d-block mb-3">
            <label htmlFor="zone" className="form-label">¿DÓNDE LO ENCONTRASTE?</label>
            <input type="text" className="form-control" id="zone" placeholder="Barrio/zona" value={newPet.zone} required onChange={handleChange} />
          </div>
          <div>
            <p className="form-label">Indica la ubicación en el mapa</p>
            <UbicationMap
              coordenates={(position) => setNewPet((prev) => ({
                ...prev,
                latitude: position.lat || "",
                longitude: position.lng || "",
              }))} />
          </div>
          <div className="d-grid gap-2 col-6 mx-auto ">
            <button className="btn btn-primary btn-publicar rounded-pill m-2" type="submit">Publicar</button>

          </div>
        </form>
      </div>
    </div >
  )
}

export default NewFoundPet