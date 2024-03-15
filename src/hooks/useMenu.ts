import { Nullable } from '@/types'
import type { ItemType } from 'ant-design-vue'
import type { Key } from 'ant-design-vue/es/_util/type'
import type { MenuClickEventHandler, SubMenuType } from 'ant-design-vue/es/menu/src/interface'

import { defaults, omit } from 'lodash-es'
import { VueElement, h, ref, type Ref } from 'vue'

export interface UseMenuOption {
  /** 允许的最大unfold数，默认不限制 */
  allowUnfold?: Nullable<number>
}

export function useMenu(option: Nullable<UseMenuOption>) {
  const items: Ref<ItemType[]> = ref([])
  const openedKeys = ref<Key[]>([])
  const selectedKeys = ref<Key[]>([])

  const itemMap = new Map<Key, ItemType[]>()

  const _option = defaults(option, {
    allowUnfold: null
  } as UseMenuOption)

  const unfoldLimit = ref(_option.allowUnfold)

  const onOpenChange = (keys: Key[]) => {
    if (unfoldLimit.value && keys.length > unfoldLimit.value) {
      keys.shift()
      openedKeys.value = keys
    }
  }

  const asItem = (
    label: VueElement | string,
    key: string,
    icon?: any,
    children?: ItemType[],
    type?: 'group',
  ): ItemType => {
    let _icon = icon

    if (_icon?.render) {
      _icon = h(_icon)
    }

    return {
      key,
      icon: _icon,
      children,
      label,
      type,
    } as ItemType
  }

  const withOnClick = (item: ItemType, onClick: MenuClickEventHandler) => ({
    ...item,
    onClick
  } as ItemType)

  const setItem = (value: ItemType[]) => {
    items.value = value
    itemMap.clear()

    const dig = (value?: ItemType | ItemType[], prev: ItemType[] = []) => {
      if (!value) {
        return;
      }
      if (Array.isArray(value)) {
        value.forEach(e => dig(e, prev))
        return;
      }
      itemMap.set(value?.key || '', prev)
      const children = (value as SubMenuType).children as ItemType[]
      dig(children, prev.concat(value))
    }

    value.forEach(e => dig(e), [])
  }

  const locateItem = (key: Key) => itemMap.get(key)

  return {
    items,
    openedKeys,
    selectedKeys,
    unfoldLimit,
    onOpenChange,
    asItem,
    setItem,
    withOnClick,
    locateItem
  }
}
