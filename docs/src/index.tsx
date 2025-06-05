import './index.css'
import { $, render } from 'woby'
import { Wodal } from '../../src/index'
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
                class="btn scale"
                onClick={() => show(value)}
                style={style}
            >
                {value}
            </button>
        )
    })

    return (
        <div class="wrap">
            <div
                class="container"
                style={{ paddingTop: (window.innerHeight - 440) / 2 }}
            >
                <h1 class="title scale">vodal</h1>
                <h3 class="intro scale">A React modal with animations.</h3>
                <div class="btn-area">{buttons}</div>
            </div>
            <Wodal
                visible={visible}
                onClose={hide}
                animation={animation}
                closeOnEsc class='w-[50%] h-[25%]'
            >
                <div class="header">vodal</div>
                <div class="body">A React modal with animations.</div>
                <button class="vodal-confirm-btn" onClick={hide}>
                    ok
                </button>
                <button class="vodal-cancel-btn" onClick={hide}>
                    close
                </button>
            </Wodal>
        </div>
    )
}

render(<App />, document.getElementById('app'))
