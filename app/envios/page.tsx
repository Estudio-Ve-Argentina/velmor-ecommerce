import { Metadata } from "next"
import { LegalPage } from "@/components/legal-page"

export const metadata: Metadata = {
  title: "Politica de Envios | VELMOR",
  description: "Informacion sobre envios, tiempos de entrega y costos de VELMOR.",
}

export default function EnviosPage() {
  return (
    <LegalPage title="Politica de Envios" lastUpdated="Marzo 2026">
      <h2>Envios a Todo el Pais</h2>
      <p>
        En VELMOR realizamos envios a todas las provincias de Argentina. Trabajamos con las 
        principales empresas de logistica para garantizar que tu pedido llegue en perfectas condiciones.
      </p>

      <h2>Tiempos de Entrega</h2>
      <h3>Capital Federal y GBA</h3>
      <ul>
        <li>Envio estandar: 2-4 dias habiles</li>
        <li>Envio express: 24-48 horas habiles</li>
      </ul>

      <h3>Interior del Pais</h3>
      <ul>
        <li>Envio estandar: 5-10 dias habiles</li>
        <li>Envio express: 3-5 dias habiles</li>
      </ul>
      <p>
        <strong>Nota:</strong> Los tiempos de entrega son estimados y pueden variar segun la 
        disponibilidad del producto y la ubicacion de destino.
      </p>

      <h2>Costos de Envio</h2>
      <p>
        El costo de envio se calcula automaticamente al momento del checkout segun el peso del 
        paquete y la ubicacion de destino.
      </p>
      <ul>
        <li><strong>Envio gratis:</strong> En compras superiores a $50.000</li>
        <li><strong>Capital Federal:</strong> Desde $2.500</li>
        <li><strong>GBA:</strong> Desde $3.000</li>
        <li><strong>Interior:</strong> Desde $4.500</li>
      </ul>

      <h2>Seguimiento de tu Pedido</h2>
      <p>
        Una vez despachado tu pedido, recibiras un correo electronico con el numero de seguimiento. 
        Podras rastrear tu envio en tiempo real a traves de la pagina del correo.
      </p>

      <h2>Recepcion del Paquete</h2>
      <p>
        Al recibir tu pedido, te recomendamos verificar el estado del paquete antes de firmar. 
        Si notas alguna irregularidad, haznos saber de inmediato.
      </p>

      <h2>Envios Internacionales</h2>
      <p>
        Actualmente no realizamos envios internacionales. Si estas interesado en recibir productos 
        VELMOR fuera de Argentina, contactanos en{" "}
        <a href="mailto:contacto@velmor.com">contacto@velmor.com</a> para evaluar opciones.
      </p>

      <h2>Contacto</h2>
      <p>
        Para consultas sobre tu envio, escribinos a{" "}
        <a href="mailto:contacto@velmor.com">contacto@velmor.com</a> o contactanos por Instagram{" "}
        <a href="https://instagram.com/velmor.in" target="_blank" rel="noopener noreferrer">@velmor.in</a>.
      </p>
    </LegalPage>
  )
}
