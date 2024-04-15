import { tw } from 'woby-styled'
import '../dist/output.css'
//@ts-ignore
import { ObservableMaybe, ObservableReadonly, type JSX } from 'woby'

export const DialogTitle = tw('h2')`font-medium text-xl leading-[1.6] tracking-[0.0075em] flex-[0_0_auto] m-0 px-6 py-4`
export const DialogContent = tw('div')`flex-auto overflow-y-auto m-0 pt-0 px-6 py-5`
export const DialogContentText = tw('p')`font-normal text-base leading-normal tracking-[0.00938em] text-[rgba(0,0,0,0.6)] m-0`
export const DialogActions = tw('div')`flex items-center justify-end flex-[0_0_auto] p-2`