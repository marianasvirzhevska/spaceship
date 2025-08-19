import React from 'react';
import { Card } from 'primereact/card';
import { Fieldset } from 'primereact/fieldset';

export function Home() {
    return (
        <div className="home-container">
            <div className="content-wrapper">
                <Card className="dark-card" title="Вітаю на борту!" subTitle="Космічний шатл Джарвіс 4040">
                <h3>Це ваш бортовий компʼютер, який допомагатиме керувати кораблем та рятувальною космічною місією.</h3>
                    <Fieldset legend="Звʼязок" toggleable>
                        <span><i className="pi pi-phone" style={{ fontSize: '2rem', color: '#7c86ff' }}></i></span> Перевіряйте звʼязок із командним пунктом Землі, слідкуйте за завданнями, які вам надсилають. Якщо повідомлення зашифроване, капітан має ввести код.
                    </Fieldset>
                    <Fieldset legend="Батарея" toggleable>
                        <span><i className="pi pi-cog" style={{ fontSize: '2rem', color: '#e17100' }}></i></span> Для роботи корабля порібно вчасно замінювати батареї живлення. Нові батареї можна купити у магазині (вартість 5 купонів). 
                        Завжди вчасно замінюйте батареї, щоб не потрапити в аварію. Інженер має ввести спеціальний код, щоб замінити батарею.
                        Коли рівень зарядду батареї низький, буде сигнал на планшеті.
                    </Fieldset>
                    <Fieldset legend="Повітря" toggleable>
                        <span><i className="pi pi-cloud" style={{ fontSize: '2rem', color: '#00d3f3' }}></i></span> Також слідкуйте за рівнем повітря на кораблі. Коли рівень опускатиметься нижче 10%, корабель видає сиглал і потрібно замінити балон з повітрям.
                        Додаткові балони можна купити в магазині (вартість 3 купони).
                        Науковець має ввести спеціальний код.
                    </Fieldset>
                    <Fieldset legend="Навігація" toggleable>
                        <span><i className="pi pi-map-marker" style={{ fontSize: '2rem', color: '#00d492' }}></i></span> Перевіряйте чи правильно працює навігація, щоб не загубитись у відкритому космосі. У разі поломки, навігатор має ввести код відновлення.
                    </Fieldset>
                </Card>
                <Card className="dark-card" title="Робот помічник" subTitle="Роміо-N - допомагатиме вам у подорожі."> 
                    <span><i className="pi pi-android" style={{ fontSize: '2rem' }}></i></span> Помічник підказуватиме вам у складних ситуаціях та направлятиме на шляху. Якщо ви не знаєте, що робити - запитайте Роміо!
                </Card>
            </div>
        </div>
    );
}