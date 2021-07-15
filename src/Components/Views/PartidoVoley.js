import React,{useEffect,useState} from 'react'
import {Link } from 'react-router-dom';
import {db} from '../../config/firebase'
import Barradenavegacion from './BarraNavegacion';
import Footer from './Footer';
import Background from '../../assets/img/Basquebolista-mujer.jpg';
const PartidoVoley = () => {
    const [partidosVoley,setPartidosVoley]=useState([]);
    const [CurrentId,setCurrentId]= useState("");
    const getPartidosVoley =async()=>{
        await db.collection("Partidos-Voley")
        .orderBy("Date","desc")
        .limit(4)
        .onSnapshot((querysnapshot)=>{
            const docs =[]
            querysnapshot.forEach((doc)=>{
                docs.push({...doc.data(),id:doc.id})
            });
            setPartidosVoley(docs)
        })
    }
    useEffect(()=>{
        getPartidosVoley();
    })
    const getPartidoVoleyIndividual = async() => {
      try {
        if(CurrentId) {
          const data = await db 
          .collection("Partidos-Voley")
          .doc(CurrentId)
          .get()
          console.log(data.id);
        }
      } catch (error) {
        console.error(error)
      }
    }
    return (
      <>
      <Barradenavegacion />
      <header style={{ marginLeft: "-11px"}}>
        <div
          className="jumbotron jumbotron-fluid"
          style={{
            marginRight: "-22px",
            backgroundColor: "rgba(26,26,26)",
          }}
        >
          <div>
            <h1
              className="text-light"
              style={{
                paddingTop: "20px",
                position: "absolute",
                zIndex: "2",
                marginLeft: "30px",
                //fontSize: "60px"
              }}
            >
              Titulo Noticia
            </h1>
            <p
              className="text-white"
              style={{
                marginTop: "65px",
                marginLeft: "30px",
                position: "absolute",
                zIndex: "3",
              }}
            >
              Nullam id dolor id nibh ultricies vehicula ut id elit. Cras justo
              odio, dapibus ac facilisis in, egestas eget quam.
            </p>
            <img
              className="img-fluid"
              src={Background}
              style={{ position: "relative", zIndex: "1", width: "100%" }}
              alt="Partidos Basket"
            />
          </div>
        </div>
      </header>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h2 className="text-light">Proximos Partidos</h2>
          </div>
        </div>
        <div className="row no-gutters row-cols-3">
          {partidosVoley.map((partido) => (
            <div
              className="col-auto col-sm-3 col-md-3 col-lg-3 col-xl-3 order-1 p-5"
              key={partido.id}
            >
              <div>
                {partido.imgA && (
                  <img
                    className="img-fluid d-inline-block"
                    src={partido?.imgA}
                    alt="Partido Basket"
                  />
                )}
              </div>
              <h4
                onClick={getPartidoVoleyIndividual}
                className="text-break text-center text-light"
              >
                {partido.Equipo_1} vs {partido.Equipo_2}
              </h4>
              <p className="text-center text-white">{partido.Fecha_Partido}</p>
              <Link to={"./partidovoley/" + partido.id}>
                <h4 onClick={() => setCurrentId}> ir al evento</h4>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* FOOTER */}
      <Footer />
    </>
    )
}

export default PartidoVoley
