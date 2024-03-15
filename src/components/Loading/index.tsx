import { computed, defineComponent } from 'vue';
import './index.scss'
import { withPropsDefault } from '@/static/utils/props';

type Props = {
  /**
   * 文本描述
   */
  description?: string
  /**
   * 尺寸
   */
  size?: number
  /**
   * 是否loading
   */
  spinning?: boolean
}

const LoadingIcon = defineComponent<Props>((_props, { slots }) => {
  const props = withPropsDefault(_props, {
    description: 'Loading...',
    size: 20,
    spinning: true
  })

  const style = computed(() => ({
    width: `${props.size}px`,
    height: `${props.size}px`
  }))

  return () => (
    <div class="spin-container" active={props.spinning}>
      {
        typeof slots.default === 'function'
          ? slots.default?.()
          : slots.default
      }

      {
        (props.spinning ? (
          <div class="spin-wrapper">
            <div class="spinner">
              <div class="bounce1" style={style.value} />
              <div class="bounce2" style={style.value} />
              <div class="bounce3" style={style.value} />
            </div>

            <span class="description">{ props.description }</span>
          </div>
        ) : null)
      }
    </div>
  )
}, {
  props: [
    'description',
    'size',
    'spinning'
  ],
  slots: [
    'default'
  ]
})

export default LoadingIcon
