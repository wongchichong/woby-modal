import './index.css'
import { $, render } from 'woby'
import { Vodal } from '../../src/index'
import '../../dist/output.css'

export const App = () => {
    const visible = $(false)
    const animation = $('zoom')

    const show = (v: string) => {
        animation(v)
        visible(true)
    }

    const hide = () => {
        visible(false)
    }

    const types = [
        'zoom',
        'fade',
        'flip',
        'door',
        'rotate',
        'slideUp',
        'slideDown',
        'slideLeft',
        'slideRight'
    ]

    const buttons = types.map((value, index) => {
        const style = {
            animationDelay: index * 100 + 'ms',
            WebkitAnimationDelay: index * 100 + 'ms'
        }
        return (
            <button
                className="btn scale"
                onClick={() => show(value)}
                style={style}
            >
                {value}
            </button>
        )
    })

    return (
        <div className="wrap">
            <div
                className="container"
                style={{ paddingTop: (window.innerHeight - 440) / 2 }}
            >
                <h1 className="title scale">vodal</h1>
                <h3 className="intro scale">A React modal with animations.</h3>
                <div className="btn-area">{buttons}</div>
            </div>
            <Vodal
                visible={visible}
                onClose={hide}
                animation={animation}
                closeOnEsc className='w-[50%] h-[25%]'
            >
                <div className="header">vodal</div>
                <div className="body">A React modal with animations.</div>
                <button className="vodal-confirm-btn" onClick={hide}>
                    ok
                </button>
                <button className="vodal-cancel-btn" onClick={hide}>
                    close
                </button>
            </Vodal>
        </div>
    )
}

render(<App />, document.getElementById('app'))
