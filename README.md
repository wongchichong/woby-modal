# Woby-Modal

A woby modal with animations. [A Rodal port](https://github.com/chenjiahan/rodal)

[Example](https://github.com/wongchichong/woby-modal)

## Installation

```bash
pnpm add voby-modal --save
```

## Usage

```javascript
import { $, render } from 'woby'
import { Wodal } from 'woby-modal';

// include styles
import '../../dist/output.css'

const App = () => {
    const visible = $(false)

    const show = (v: string) => {
        animation(v)
        visible(true)
    }

    const hide = () => {
        visible(false)
    }

    return (
      <div>
        <button onClick={this.show.bind(this)}>show</button>

        <Wodal
            visible={visible}
            onClose={hide}
            animation={animation}
            closeOnEsc class='w-[50%] h-[25%]'
        >
            <div>Content</div>

            <button class="vodal-confirm-btn" onClick={hide}>
                ok
            </button>
            <button class="vodal-cancel-btn" onClick={hide}>
                close
            </button>
        </Wodal>
      </div>
    );
  }

render(<App />, document.getElementById('app'))

```

## Props

| Property         | Type   | Default | Description                                          |
| ---------------- | ------ | ------- | ---------------------------------------------------- |
| onClose          | func   | /       | handler called onClose of modal                      |
| onAnimationEnd   | func   | /       | handler called onEnd of animation                    |
| visible          | bool   | false   | whether to show dialog                               |
| showMask         | bool   | true    | whether to show mask                                 |
| closeOnEsc       | bool   | false   | whether close dialog when esc pressed                |
| closeMaskOnClick | bool   | true    | whether close dialog when mask clicked               |
| showCloseButton  | bool   | true    | whether to show close button                         |
| animation        | string | zoom    | animation type                                       |
| enterAnimation   | string | /       | enter animation type (higher order than 'animation') |
| leaveAnimation   | string |         | leave animation type (higher order than 'animation') |
| duration         | number | 300     | animation duration                                   |
| className        | string | w-[50%] h-[25%]       | className for the container                          |
| customStyles     | object | /       | custom styles                                        |
| customMaskStyles | object | /       | custom mask styles                                   |
| id               | string | /       | id for dialog                                        |

## Animation Types

- zoom
- fade
- flip
- door
- rotate
- slideUp
- slideDown
- slideLeft
- slideRight

## Other

