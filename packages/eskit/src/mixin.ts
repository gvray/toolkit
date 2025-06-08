import copyProperties from './copyProperties'
/**
 * Creates a new class by combining multiple classes (mixin pattern).
 * 通过组合多个类创建新类（混入模式）。
 *
 * @param mixins - The classes to combine / 要组合的类
 * @returns A new class with combined functionality / 具有组合功能的新类
 *
 * @example
 * ```typescript
 * // Define base classes
 * class Walkable {
 *   walk() {
 *     console.log('Walking...')
 *   }
 * }
 *
 * class Swimmable {
 *   swim() {
 *     console.log('Swimming...')
 *   }
 * }
 *
 * class Flyable {
 *   fly() {
 *     console.log('Flying...')
 *   }
 * }
 *
 * // Create combined classes
 * const Duck = mixin(Walkable, Swimmable, Flyable)
 * const Fish = mixin(Swimmable)
 * const Bird = mixin(Walkable, Flyable)
 *
 * // Use the mixed classes
 * const duck = new Duck()
 * duck.walk() // 'Walking...'
 * duck.swim() // 'Swimming...'
 * duck.fly() // 'Flying...'
 *
 * const fish = new Fish()
 * fish.swim() // 'Swimming...'
 * // fish.walk() // Error: walk is not a function
 *
 * // With properties and constructor logic
 * class HasName {
 *   constructor() {
 *     this.name = 'Unknown'
 *   }
 *   getName() {
 *     return this.name
 *   }
 * }
 *
 * class HasAge {
 *   constructor() {
 *     this.age = 0
 *   }
 *   getAge() {
 *     return this.age
 *   }
 * }
 *
 * const Person = mixin(HasName, HasAge)
 * const person = new Person()
 * console.log(person.getName()) // 'Unknown'
 * console.log(person.getAge()) // 0
 * ```
 *
 * @since 1.0.0
 */
const mixin = (...mixins: any[]): any => {
  class Mixin {
    constructor() {
      for (const mixin of mixins) {
        copyProperties(this, new mixin()) // Copy Instance Properties
      }
    }
  }

  for (const mixin of mixins) {
    copyProperties(Mixin, mixin) // Copy static properties
    copyProperties(Mixin.prototype, mixin.prototype) // Copy prototype properties
  }

  return Mixin
}

export default mixin
