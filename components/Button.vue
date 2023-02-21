<template>
  <component
    :is="tag"
    class="ripple relative flex cursor-pointer select-none flex-row items-center justify-center rounded-md disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400"
    :class="[typeSet, heightSet, roundedSet]"
    :disabled="disable"
    @click="click"
    :href="href"
    :target="blank ? '_blank' : ''"
  >
    <transition name="fade">
      <Spinner
        v-if="loading"
        class="absolute left-0 right-0 m-auto h-6 w-6 transform text-white"
      />
    </transition>

    <Icon v-if="icon" :icon="icon" :class="[iconSize, iconColors]" />
    <span v-if="!loading" class="mx-3">{{ label }}</span>
  </component>
</template>

<script>
export default {
  data() {
    return {
      sets: {
        Primary: 'bg-skin-accent text-white hover:bg-skin-primary',
        Secondary: 'bg-yellow-400 text-slate-600 hover:bg-yellow-500',
        Danger: 'bg-red-600 text-white hover:bg-red-700',
      },
      hightList: {
        Small: 'h-8 font-normal text-sm',
        Medium: 'h-12 font-normal text-lg',
        Large: 'h-14 font-normal text-xl',
      },
      spinnerHeight: {
        Small: 'h-4 w-4',
        Medium: 'h-6 w-6',
        Large: 'h-8 w-8',
      },
      iconSizeList: {
        Small: 'h-4 w-4',
        Medium: 'h-6 w-6',
        Large: 'h-8 w-8',
      },
      iconColorsList: {
        Primary: 'text-white',
        Secondary: 'text-slate-600',
        Danger: 'text-white',
      },
    }
  },
  props: {
    setType: {
      type: String,
      default: 'Primary',
    },
    size: {
      type: String,
      default: 'Medium',
    },
    label: {
      type: String,
      default: 'Button',
    },
    disable: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    rounded: {
      type: Boolean,
      default: false,
    },
    href: {
      type: String,
      default: '',
    },
    anchor: {
      type: Boolean,
      default: false,
    },
    blank: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
      default: null,
    },
  },
  computed: {
    typeSet() {
      return this.sets[`${this.setType}`]
    },
    roundedSet() {
      return this.rounded ? 'rounded-full' : 'rounded-md'
    },
    heightSet() {
      return this.hightList[`${this.size}`]
    },
    tag() {
      if (this.anchor && !this.loading && !this.disable) {
        return 'a'
      } else {
        return 'button'
      }
    },
    iconSize() {
      return this.iconSizeList[`${this.size}`]
    },
    iconColors() {
      return this.iconColorsList[`${this.type}`]
    },
  },
  methods: {
    click() {
      if (!this.loading && !this.disable) {
        this.$emit('click')
      }
    },
  },
  created() {
    if (this.sets[`${this.setType}`] == undefined) {
      console.error(`the setType {${this.setType}} does not exists in the button set`)
    }
  },
}
</script>
<style>
.ripple {
  background-position: center;
  transition: background 0.8s;
}
.ripple:hover {
  background: #47a7f5 radial-gradient(circle, transparent 1%, #47a7f5 1%)
    center/15000%;
}
.ripple:active {
  background-color: #6eb9f7;
  background-size: 100%;
  transition: background 0s;
}
</style>
