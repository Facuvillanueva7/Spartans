import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../../config/firebase";
import BarraNavegacion from "../Views/BarraNavegacion";
import Footer from "../Views/Footer";
import Background from "../../assets/img/Basquebolista-mujer.jpg";
const NoticiasFutbol = () => {
  const [noticiasFutbol, setNoticiasFutbol] = useState([]);
  const [CurrentId, setCurrentId] = useState();
  const getNoticiasFutbol = async () => {
    await db
      .collection("Noticias-Futbol")
      .orderBy("Date", "desc")
      .limit(4)
      .onSnapshot((querysnapshot) => {
        const docs = [];
        querysnapshot.forEach((doc) => {
          docs.push({ ...doc.data(), id: doc.id });
        });
        setNoticiasFutbol(docs);
      });
  };
  useEffect(() => {
    getNoticiasFutbol();
  });
  const getNoticiaFutbolIndividual = async () => {
    try {
      if (CurrentId) {
        const data = await db
          .collection("Noticias-futbol")
          .doc(CurrentId)
          .get();
        console.log(data.id);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <BarraNavegacion />
      <header style={{ marginLeft: "-11px" }}>
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
              }}
            >
              Titulo Noticia
            </h1>
            <p
              className="text-white"
              style={{
                marginTop: "54px",
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
      <div
        className="article-list"
        style={{ backgroundColor: "rgba(0,0,0,0.1)" }}
      >
        <div className="container">
          <div className="row">
            {noticiasFutbol.map((noticia) => (
              <div className="col-sm-6 col-md-3 item" key={noticia.id}>
                {noticia.NoticiaFutbolImg && (
                  <img
                    src={noticia?.NoticiaFutbolImg}
                    className="img-fluid"
                    alt="sample"
                    onClick={getNoticiaFutbolIndividual}
                  />
                )}
                <h3 onClick={() => setCurrentId}>{noticia.Title}</h3>
                <p>{noticia.Body.substring(0, 100)}</p>
                <Link to={"./noticiafutbol/" + noticia.id}>
                  <p>Leer Mas</p>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default NoticiasFutbol;
