import { Metadata } from "next"
import { LegalPage } from "@/components/legal-page"

export const metadata: Metadata = {
  title: "Terminos y Condiciones | VELMOR",
  description: "Terminos y condiciones de uso de la tienda online VELMOR.",
}

export default function TerminosPage() {
  return (
    <LegalPage title="Terminos y Condiciones" lastUpdated="Marzo 2026">
      <h2>1. Aceptacion de los Terminos</h2>
      <p>
        Al acceder y utilizar el sitio web de VELMOR, aceptas estos terminos y condiciones en su totalidad. 
        Si no estas de acuerdo con alguno de estos terminos, te pedimos que no utilices nuestro sitio.
      </p>

      <h2>2. Productos y Precios</h2>
      <p>
        Todos los productos mostrados estan sujetos a disponibilidad. Nos reservamos el derecho de 
        modificar precios sin previo aviso. Los precios incluyen IVA y estan expresados en Pesos Argentinos (ARS).
      </p>
      <p>
        Las imagenes de los productos son ilustrativas. Pueden existir leves variaciones en el color 
        debido a las caracteristicas del cuero natural.
      </p>

      <h2>3. Proceso de Compra</h2>
      <p>
        Al realizar una compra, nos envias una oferta de adquisicion del producto seleccionado. 
        Te enviaremos una confirmacion por correo electronico una vez que el pago sea procesado 
        exitosamente. El contrato de compra se perfecciona con dicha confirmacion.
      </p>

      <h2>4. Formas de Pago</h2>
      <p>Aceptamos los siguientes metodos de pago:</p>
      <ul>
        <li>Tarjetas de credito (Visa, Mastercard, American Express)</li>
        <li>Tarjetas de debito</li>
        <li>Mercado Pago</li>
        <li>Transferencia bancaria</li>
      </ul>

      <h2>5. Envios</h2>
      <p>
        Realizamos envios a todo el territorio argentino. Los tiempos de entrega varian segun 
        la ubicacion y se informan al momento de la compra. Consulta nuestra pagina de{" "}
        <a href="/envios">politica de envios</a> para mas detalles.
      </p>

      <h2>6. Cambios y Devoluciones</h2>
      <p>
        Aceptamos cambios y devoluciones dentro de los 10 dias de recibido el producto, siempre 
        que se encuentre en perfectas condiciones y con su embalaje original. Consulta nuestra{" "}
        <a href="/devoluciones">politica de devoluciones</a>.
      </p>

      <h2>7. Propiedad Intelectual</h2>
      <p>
        Todo el contenido del sitio (logos, imagenes, textos, disenos) es propiedad de VELMOR 
        y esta protegido por leyes de propiedad intelectual. Su uso no autorizado esta prohibido.
      </p>

      <h2>8. Limitacion de Responsabilidad</h2>
      <p>
        VELMOR no sera responsable por danos indirectos, incidentales o consecuentes derivados 
        del uso de nuestros productos o servicios.
      </p>

      <h2>9. Modificaciones</h2>
      <p>
        Nos reservamos el derecho de modificar estos terminos en cualquier momento. Los cambios 
        seran efectivos desde su publicacion en el sitio.
      </p>

      <h2>10. Jurisdiccion</h2>
      <p>
        Estos terminos se rigen por las leyes de la Republica Argentina. Cualquier controversia 
        sera resuelta por los tribunales de la Ciudad Autonoma de Buenos Aires.
      </p>
    </LegalPage>
  )
}
