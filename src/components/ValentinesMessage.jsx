import React, { useState, useRef, useEffect } from 'react';
import cancion from './until.mp3'; // Asegúrate de que la ruta al archivo MP3 sea correcta

const ValentinesMessage = () => {
  const [envelopeVisible, setEnvelopeVisible] = useState(true);
  const [heartVisible, setHeartVisible] = useState(true);
  const [cardVisibility, setCardVisibility] = useState('hidden');
  const [opacity, setOpacity] = useState(0);
  const [scale, setScale] = useState(0.1);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 6; // Ajusta según el número de páginas que desees
  const [pageTransition, setPageTransition] = useState('');
  const audioRef = useRef(null);

  useEffect(() => {
    setPageTransition('page-enter');
    const timer = setTimeout(() => setPageTransition(''), 500); // Duración de la animación de entrada
    return () => clearTimeout(timer);
  }, [currentPage]);

  const handleInitialClick = () => {
    if (envelopeVisible || heartVisible) { // Solo ejecuta esto si el sobre o el corazón son visibles
      setEnvelopeVisible(false);
      setHeartVisible(false);
      setTimeout(() => {
        setCardVisibility('visible');
        let animationFrame, start;
        const animate = (timestamp) => {
          if (!start) start = timestamp;
          const progress = timestamp - start;
          setOpacity(Math.min(progress / 1000, 1));
          setScale(1 + Math.sin(Math.min(progress / 1000, 1) * Math.PI) * 0.1);
          if (progress < 1000) {
            animationFrame = requestAnimationFrame(animate);
          }
        };
        animationFrame = requestAnimationFrame(animate);
        if (audioRef.current) {
          audioRef.current.play();
        }
      }, 800);
    }
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const renderPageContent = () => {
    switch (currentPage) {
      case 1:
      return (
        <div className="page-content">
          <h2>Para Stei</h2>
          <p>No quería decirlo por miedo a perderte, Stei eres una chica increíble y la verdad no quería que nuestra relación se tornara incómoda al decírtelo pero ni modo..... creo que este sentimiento es tan grande que no puedo simplemente guardármelo para mí y seguir como si nada con mi vida, como si no te pensara en el día y así mismo como si no aparecieras en mis sueños por las noches.</p>
        </div>
      );
      case 2:
        return (
          <div className="page-content">
          <br></br>
          <br></br>
          <p> Al carajo estar callado y pensando en el que pasaria sí 🤔, prefiero jugarmela y queria decirlo mirandote en persona pero las cosas no se dieron ..... ya no podia mas con esta gran carga, sería un mentiroso completo si digo que no me gustas y me mentiria a mi mismo, un claro ejemplo de esto es el dia de la salida ahí actué de una forma muy pateticas ya que de verdad me gustas al punto de embelezarme, no sabia ni que pendejadas estaba haciendo.</p>
          </div>
        )
      case 3:
        return (
          <div className="page-content">
          <p>Lo curioso es que inicialmente no estaba buscando nada y sin darme cuenta mi corazón encontró una nueva razón para latir con más fuerza, como si hubieras inyectado adrenalina directamente en mi sistema circulatorio. Desde que te conocí, cada momento se ha vuelto más brillante y cada pequeña cosa parece tener más sentido. Es como si antes de ti, el mundo estuviera en blanco y negro, y de repente, se llenara de color. He aprendido a ver la belleza en lo cotidiano, a apreciar los pequeños gestos y a valorar el tiempo de una manera que nunca antes había considerado.</p>
          </div>
        )
      case 4:
        return (
          <div className="page-content">
          <br></br>
          <p>  Las palabras se me quedan cortas para expresarlo y hacer que me entiendas, así que lo haré en tus términos✍️.
            Podrías considerarme tu paciente más dedicado, porque cada sonrisa tuya es como una dosis de la medicina más potente, capaz de curar cualquier dolencia. No es una enfermedad, sino un estado de bienestar completo cuando estoy a tu lado. Como si tú fueras la vitamina esencial que mi cuerpo había estado buscando, el elemento faltante para mi equilibrio perfecto.</p>
          </div>
        )
      case 5:
        return <p>Me encantas como no tienes idea, me sorprende como alguien puede volverse tan importante en la vida de uno 🤔, no estaba en busqueda de amor ni mucho menos pero la forma en la que mi corazón hizo click contigo me dejó muy sorprendido. Este sentimiento fue tan inesperado como maravilloso. Luego de lo que paso veía el amor más como una idea lejana que como una posibilidad real. Pero desde que apareciste, todo cambió. De repente, me encontré esperando con ansias cada nuevo mensaje,  cada conversación  y de las salidas ni se diga.</p>;
      case 6:
          return <p>Espero que este mensaje te haya llegado al corazón, porque es de corazón. No hay nada más que decir, solo que te quiero mucho y espero que este mensaje te haya sacado una sonrisa. te mando un fuerte abrazo, Stei 🌹. Espero no haber mandado la amistad y relacion al carajo 😞 pero no puedo seguir fingiendo que no me gustas.</p>;
      default:
        return <p>Contenido no encontrado.</p>;
    }
  };

  return (
    <div>
      <div className="valentines-day" style={{ display: envelopeVisible ? 'block' : 'none' }} onClick={handleInitialClick}>
        <div className="envelope"></div>
        {heartVisible && <div className="heart"></div>}
        <div className="text">DE CATO <br /> CON MUCHO <br /> AMOR</div>
        <div className="front"></div>
      </div>

      <div id="card" style={{ visibility: cardVisibility, opacity: opacity, transform: `scale(${scale})` }}>
        <div className="side one"></div>
        <div className="side two">
          <div className={`page-content ${pageTransition}`}>
            {renderPageContent()}
          </div>
          <div className="page-controls">
            <button onClick={prevPage} disabled={currentPage === 1}>Anterior</button>
            <button onClick={nextPage} disabled={currentPage === totalPages}>Siguiente</button>
          </div>
        </div>
      </div>

      <audio ref={audioRef} src={cancion} />
    </div>
  );
};

export default ValentinesMessage;