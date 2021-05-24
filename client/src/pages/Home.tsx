import { Component } from 'react';
import { togglePage } from '../data/state';
import store from '../data/store';
import home1 from '../assets/home1.jpg';

export default class Home extends Component {
    render() {
        return (
            <div className="page home">
                <section className="header">
                    <article className="title">
                        <h1>Corporate messaging</h1>
                        <div>Business at hand</div>
                        <button onClick={() => store.dispatch(togglePage(1))}>Get started...</button>
                    </article>
                    <article className="buttons">
                        <div className="col1">
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed dolore maxime eius qui, assumenda mollitia necessitatibus harum accusamus commodi nobis quas ullam nihil molestias vel ducimus cupiditate a asperiores reprehenderit.</p>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat asperiores iusto ex amet dolore rerum sit quibusdam quod velit voluptatem distinctio eligendi eos culpa dolorum itaque maxime minus numquam inventore officiis sed perspiciatis adipisci, eveniet laudantium. Aperiam reprehenderit incidunt blanditiis.</p>
                        </div>
                        <div className="col2">


                            <div className="photo-wrapper">
                                <img src={home1} alt="" />
                            </div>
                        </div>
                    </article>
                </section>
            </div>
        )
    }
}

