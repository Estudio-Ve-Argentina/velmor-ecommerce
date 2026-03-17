import { Metadata } from "next"
import { LegalPage } from "@/components/legal-page"

export const metadata: Metadata = {
  title: "Cambios y Devoluciones | VELMOR",
  description: "Politica de cambios y devoluciones de productos VELMOR.",
}

export default function DevolucionesPage() {
  return (
    <LegalPage title="Cambios y Devoluciones" lastUpdated="Marzo 2026">
      <h2>Politica de Cambios</h2>
      <p>
        En VELMOR queremos que estes 100% satisfecho con tu compra. Si necesitas realizar un cambio, 
        tenes hasta <strong>10 dias habiles</strong> desde la recepcion del producto para solicitarlo.
      </p>

      <h3>Condiciones para Cambios</h3>
      <ul>
        <li>El producto debe estar sin uso y en perfectas condiciones</li>
        <li>Debe conservar todas las etiquetas originales</li>
        <li>Debe estar en su empaque original</li>
        <li>Debes presentar el comprobante de compra</li>
      </ul>

      <h3>Como Solicitar un Cambio</h3>
      <ol>
        <li>Contactanos por email a <a href="mailto:contacto@velmor.com">contacto@velmor.com</a></li>
        <li>Indicanos tu numero de pedido y el motivo del cambio</li>
        <li>Te enviaremos las instrucciones para el envio del producto</li>
        <li>Una vez recibido y verificado, procesaremos el cambio</li>
      </ol>

      <h2>Politica de Devoluciones</h2>
      <p>
        Aceptamos devoluciones dentro de los <strong>10 dias habiles</strong> posteriores a la 
        recepcion del producto. El reembolso se realizara por el mismo metodo de pago utilizado 
        en la compra original.
      </p>

      <h3>Condiciones para Devoluciones</h3>
      <ul>
        <li>El producto debe estar sin uso</li>
        <li>Debe estar en perfectas condiciones</li>
        <li>Debe incluir empaque y etiquetas originales</li>
        <li>No aplica para productos personalizados</li>
      </ul>

      <h3>Proceso de Reembolso</h3>
      <p>
        Una vez recibido el producto y verificadas las condiciones, procesaremos el reembolso 
        en un plazo de 5-10 dias habiles. El tiempo de acreditacion depende de tu entidad bancaria.
      </p>

      <h2>Productos Defectuosos</h2>
      <p>
        Si recibiste un producto con defectos de fabricacion, contactanos inmediatamente. 
        Cubriremos los costos de envio y te ofreceremos un cambio o reembolso completo.
      </p>

      <h2>Costos de Envio</h2>
      <ul>
        <li><strong>Cambios por talle o color:</strong> El costo del envio corre por cuenta del cliente</li>
        <li><strong>Productos defectuosos:</strong> VELMOR cubre el costo del envio</li>
        <li><strong>Devoluciones:</strong> El costo del envio corre por cuenta del cliente</li>
      </ul>

      <h2>Excepciones</h2>
      <p>No se aceptan cambios ni devoluciones en los siguientes casos:</p>
      <ul>
        <li>Productos usados o danados por el cliente</li>
        <li>Productos sin etiquetas o empaque original</li>
        <li>Productos personalizados o grabados</li>
        <li>Solicitudes fuera del plazo establecido</li>
      </ul>

      <h2>Contacto</h2>
      <p>
        Para gestionar un cambio o devolucion, escribinos a{" "}
        <a href="mailto:contacto@velmor.com">contacto@velmor.com</a> con el asunto 
        "Cambio/Devolucion - [Tu numero de pedido]".
      </p>
    </LegalPage>
  )
}
