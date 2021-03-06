import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../../config/firebase";
import BarraNavegacion from "../Views/BarraNavegacion";
import Footer from "../Views/Footer";
import Background from '../../assets/img/Basquebolista-mujer.jpg';

//CSS
import "../../assets/bootstrap/css/bootstrap.min.css";
import "../../assets/fonts/font-awesome.min.css";
import "../../assets/fonts/ionicons.min.css";
import "../../assets/css/Article-Clean.css";
import "../../assets/css/Article-Dual-Column.css";
import "../../assets/css/Article-List.css";
import "../../assets/css/Footer-Dark.css";
import "../../assets/css/Projects-Clean.css";
import "../../assets/css/Social-Icons.css";
import "../../assets/css/styles.css";

const NoticiasBasket = () => {
  const [noticiasBasket, setNoticiasBasket] = useState([]);
  const [currentId, setCurrentId] = useState("");
  const getNoticiasBasket = async () => {
    await db
      .collection("Noticias-Basket")
      .orderBy("Date", "desc")
      .limit(4)
      .onSnapshot((querysnapshot) => {
        const docs = [];
        querysnapshot.forEach((doc) => {
          docs.push({ ...doc.data(), id: doc.id });
        });
        setNoticiasBasket(docs);
      });
  };
  useEffect(() => {
    getNoticiasBasket();
  });
  const getNoticiaBasketIndividual = async (noticiaObject) => {
    try {
      if (currentId) {
        const data = await db
          .collection("Noticias-Basket")
          .doc(currentId)
          .get();
        console.log(data.id);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <BarraNavegacion/>
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
              src={Background}
              className="img-fluid"
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
          <div className="row article">
            {noticiasBasket.map((noticia) => (
              <div className="col-sm-6 col-md-3 item" key={noticia.id}>
                {noticia.imgA && (
                  <img
                    className="img-fluid"
                    src={noticia?.imgA}
                    alt="sample"
                    onClick={getNoticiaBasketIndividual}
                  />
                )}
                {noticia.imgB && (
                  <img
                    className="img-fluid"
                    src={noticia?.imgB}
                    alt="sample"
                    onClick={getNoticiaBasketIndividual}
                  />
                )}
                <h3
                  className="text-white name"
                  onClick={() => setCurrentId(noticia.id)}
                >
                  {noticia.Title}
                </h3>
                <p className="text-white-50 description">
                  {noticia.Body.substring(0, 100)}
                </p>
                <Link to={"./noticiabasket/" + noticia.id}>
                  <p>Leer Mas</p>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default NoticiasBasket;
