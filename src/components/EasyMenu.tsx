/* eslint-disable react/jsx-props-no-spreading */
import { Menu } from 'ant-design-vue'
import { defineComponent } from 'vue'

import { useMenu, type UseMenuOption } from '@hooks/useMenu'
import { Nullable } from '@/types/index'

/**
 * 使用EasyMenu
 * @param options Menu选项，同useMenu
 * @param initFn 回调，在渲染Menu前做的初始操作
 */
const EasyMenu = (
  options: Nullable<UseMenuOption>,
  initFn?: (args: ReturnType<typeof useMenu>) => void
) => defineComponent(
  (props: InstanceType<typeof Menu>['$props']) => {
    const ret = useMenu(options)
    const { items, openedKeys, selectedKeys, onOpenChange } = ret
    initFn?.(ret)

    return () => (
      <Menu
        v-model:openKeys={openedKeys.value}
        v-model:selectedKeys={selectedKeys.value}
        items={items.value}
        onOpenChange={
          (keys) => {
            props?.onOpenChange?.(keys)
            onOpenChange(keys)
          }
        }
        {...props}
      />
    )
  }
)

export default EasyMenu
