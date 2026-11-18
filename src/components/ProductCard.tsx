/* eslint-disable import-x/order */
/* eslint-disable @typescript-eslint/consistent-type-imports */
import { useState } from 'react';
import { Product } from '../types/Product';

interface Props {
  product: Product;
  index: number;
}

const ProductCard: React.FC<Props> = ({ product, index }) => {
  const [imgError, setImgError] = useState(false);

  const fecha = product.created_at
    ? new Date(product.created_at).toLocaleDateString('es-ES')
    : null;
  const codigo = String(index + 1).padStart(3, '0');

  return (
    <div
      className="cyber-card"
      style={{ animationDelay: `0s, ${index * 0.08}s` }}
    >
      <div className="cyber-card__inner">
        <figure className="cyber-card__media">
          <span className="cyber-card__tag">#{codigo}</span>
          <span className="cyber-chip">{product.tecnologia}</span>

          {imgError || !product.imagen ? (
            <div className="cyber-card__nosignal">SIN SEÑAL</div>
          ) : (
            <img
              src={product.imagen}
              alt={product.titulo}
              className="img-fluid"
              onError={() => setImgError(true)}
            />
          )}

          <figcaption className="cyber-card__caption">
            <h5 className="cyber-card__title">{product.titulo}</h5>
            <p className="cyber-card__author">por {product.autor}</p>
          </figcaption>
        </figure>

        <div className="cyber-card__body">
          {product.enlace_video && (
            <video controls preload="metadata" className="cyber-card__video">
              <source src={product.enlace_video} type="video/mp4" />
              Tu navegador no soporta vídeo.
            </video>
          )}

          <div className="cyber-links">
            {product.enlace_teaser && (
              <a
                href={product.enlace_teaser}
                target="_blank"
                rel="noopener noreferrer"
                className="cyber-btn"
              >
                Teaser
              </a>
            )}
            {product.enlace_comic && (
              <a
                href={product.enlace_comic}
                target="_blank"
                rel="noopener noreferrer"
                className="cyber-btn cyber-btn--pink"
              >
                Cómic
              </a>
            )}
          </div>

          <div className="cyber-stats">
            <span className="cyber-stats__likes">♥ {product.total_me_gusta ?? 0}</span>
            <span>{product.total_resenas ?? 0} reseñas</span>
            {fecha && <span className="cyber-stats__date">{fecha}</span>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;