
import {
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonCard
} from '@ionic/react';

import { Redirect } from 'react-router-dom';

//   import styles from './Item.module.css';

type ItemProps = {
    productId: string,
    src: string,
    title: string,
    price: string,
    content: string
}

const Item:React.FC<ItemProps> = ({ productId, src, title, price, content }) => {
    return (
        <IonCard button routerLink={`/product/${productId}`} >
            <img alt="product" src={src} />
            <IonCardHeader>
                <IonCardTitle>{title}</IonCardTitle>
                <IonCardSubtitle>{price}</IonCardSubtitle>
            </IonCardHeader>

            <IonCardContent>
                {content}
            </IonCardContent>
        </IonCard>
    );
};

export default Item;
