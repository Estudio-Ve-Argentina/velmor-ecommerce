import { Metadata } from "next"
import { LegalPage } from "@/components/legal-page"

export const metadata: Metadata = {
  title: "Politica de Cookies | VELMOR",
  description: "Informacion sobre el uso de cookies en el sitio web de VELMOR.",
}

export default function CookiesPage() {
  return (
    <LegalPage title="Politica de Cookies" lastUpdated="Marzo 2026">
      <h2>Que son las Cookies</h2>
      <p>
        Las cookies son pequenos archivos de texto que se almacenan en tu dispositivo cuando 
        visitas un sitio web. Nos permiten recordar tus preferencias y mejorar tu experiencia 
        de navegacion.
      </p>

      <h2>Cookies que Utilizamos</h2>
      
      <h3>Cookies Esenciales</h3>
      <p>
        Son necesarias para el funcionamiento basico del sitio. Permiten funciones como el 
        carrito de compras y el proceso de checkout.
      </p>

      <h3>Cookies de Rendimiento</h3>
      <p>
        Nos ayudan a entender como interactuas con nuestro sitio, recopilando informacion 
        anonima sobre las paginas visitadas y errores encontrados.
      </p>

      <h3>Cookies de Funcionalidad</h3>
      <p>
        Permiten recordar tus preferencias (como idioma o region) para brindarte una 
        experiencia mas personalizada.
      </p>

      <h3>Cookies de Marketing</h3>
      <p>
        Se utilizan para mostrarte publicidad relevante basada en tus intereses. 
        Tambien limitan la cantidad de veces que ves un anuncio.
      </p>

      <h2>Como Gestionar las Cookies</h2>
      <p>
        Podes configurar tu navegador para bloquear o eliminar cookies. Sin embargo, 
        esto puede afectar el funcionamiento de algunas partes del sitio.
      </p>
      <p>Instrucciones por navegador:</p>
      <ul>
        <li><strong>Chrome:</strong> Configuracion &gt; Privacidad y seguridad &gt; Cookies</li>
        <li><strong>Firefox:</strong> Opciones &gt; Privacidad y seguridad &gt; Cookies</li>
        <li><strong>Safari:</strong> Preferencias &gt; Privacidad &gt; Cookies</li>
        <li><strong>Edge:</strong> Configuracion &gt; Privacidad &gt; Cookies</li>
      </ul>

      <h2>Cookies de Terceros</h2>
      <p>Utilizamos servicios de terceros que pueden establecer sus propias cookies:</p>
      <ul>
        <li><strong>Google Analytics:</strong> Para analizar el trafico del sitio</li>
        <li><strong>Meta Pixel:</strong> Para publicidad en redes sociales</li>
        <li><strong>Tienda Nube:</strong> Para el procesamiento de pagos</li>
      </ul>

      <h2>Actualizaciones</h2>
      <p>
        Esta politica puede actualizarse periodicamente. Te recomendamos revisarla 
        regularmente para estar informado sobre como protegemos tu informacion.
      </p>

      <h2>Contacto</h2>
      <p>
        Para consultas sobre nuestra politica de cookies, contactanos en{" "}
        <a href="mailto:contacto@velmor.com">contacto@velmor.com</a>.
      </p>
    </LegalPage>
  )
}
