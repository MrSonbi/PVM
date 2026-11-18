/* eslint-disable import-x/order */
/* eslint-disable @typescript-eslint/consistent-type-imports */
import { useEffect, useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { supabase } from '../config/supabase';
import { Product } from '../types/Product';
import ProductCard from '../components/ProductCard';
import '../theme/futuristic.css';

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      const { data, error } = await supabase.from('products').select('*');

      if (error) {
        setError(error.message);
      } else {
        setProducts(data ?? []);
      }
      setLoading(false);
      console.log(data);
    };

    loadProducts();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="cyber-toolbar">
          <IonTitle>Productos</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="cyber-content">
        <div className="cyber-bg">
          <div className="orb orb-1" />
          <div className="orb orb-2" />
          <div className="orb orb-3" />

          <div className="container cyber-container pb-5">
            <header className="cyber-hero">
              <h1>Catálogo</h1>
              <p>{loading ? 'sincronizando' : `${products.length} registros en línea`}</p>
            </header>

            {loading && <div className="cyber-loader">CARGANDO DATOS...</div>}
            {error && <div className="cyber-error">⚠ {error}</div>}

            <div className="row g-4">
              {products.map((p, i) => (
                <div key={p.id} className="col-12 col-md-6 col-lg-4">
                  <ProductCard product={p} index={i} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;