import { Metadata } from "next"
import { LegalPage } from "@/components/legal-page"

export const metadata: Metadata = {
  title: "Politica de Privacidad | VELMOR",
  description: "Conoce como VELMOR protege y gestiona tu informacion personal.",
}

export default function PrivacidadPage() {
  return (
    <LegalPage title="Politica de Privacidad" lastUpdated="Marzo 2026">
      <h2>1. Informacion que Recopilamos</h2>
      <p>
        En VELMOR recopilamos informacion que nos proporcionas directamente cuando realizas una compra, 
        te suscribes a nuestro newsletter o te comunicas con nosotros. Esta informacion puede incluir:
      </p>
      <ul>
        <li>Nombre completo</li>
        <li>Direccion de correo electronico</li>
        <li>Numero de telefono</li>
        <li>Direccion de envio</li>
        <li>Informacion de pago (procesada de forma segura por terceros)</li>
      </ul>

      <h2>2. Uso de la Informacion</h2>
      <p>Utilizamos tu informacion para:</p>
      <ul>
        <li>Procesar y enviar tus pedidos</li>
        <li>Comunicarnos contigo sobre tu compra</li>
        <li>Enviarte actualizaciones y promociones (solo si lo autorizas)</li>
        <li>Mejorar nuestros productos y servicios</li>
        <li>Cumplir con obligaciones legales</li>
      </ul>

      <h2>3. Proteccion de Datos</h2>
      <p>
        Implementamos medidas de seguridad tecnicas y organizativas para proteger tu informacion personal 
        contra acceso no autorizado, perdida o destruccion. Tus datos de pago son procesados de forma 
        segura a traves de plataformas certificadas.
      </p>

      <h2>4. Compartir Informacion</h2>
      <p>
        No vendemos ni compartimos tu informacion personal con terceros, excepto cuando sea necesario 
        para procesar tu pedido (empresas de logistica) o cuando la ley lo requiera.
      </p>

      <h2>5. Tus Derechos</h2>
      <p>Tienes derecho a:</p>
      <ul>
        <li>Acceder a tu informacion personal</li>
        <li>Solicitar la correccion de datos incorrectos</li>
        <li>Solicitar la eliminacion de tus datos</li>
        <li>Oponerte al procesamiento de tus datos</li>
        <li>Retirar tu consentimiento en cualquier momento</li>
      </ul>

      <h2>6. Cookies</h2>
      <p>
        Utilizamos cookies para mejorar tu experiencia de navegacion. Puedes configurar tu navegador 
        para rechazar cookies, aunque esto puede afectar algunas funcionalidades del sitio.
      </p>

      <h2>7. Contacto</h2>
      <p>
        Para consultas sobre privacidad, contactanos en{" "}
        <a href="mailto:contacto@velmor.com">contacto@velmor.com</a>.
      </p>
    </LegalPage>
  )
}
