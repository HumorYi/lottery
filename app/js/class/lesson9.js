{
  // Symbol()函数会返回symbol类型的值，该类型具有静态属性和静态方法。它的静态属性会暴露几个内建的成员对象；它的静态方法会暴露全局的symbol注册，且类似于内建对象类，但作为构造函数来说它并不完整，因为它不支持语法："new Symbol()"。

  // 每个从Symbol()返回的symbol值都是唯一的。一个symbol值能作为对象属性的标识符；这是该数据类型仅有的目的。
  // symbol 是一种基本数据类型

  // 声明，为赋值
  let a1 = Symbol();
  let a2 = Symbol();
  console.log(a1 === a2); // false

  // 声明并赋值
  let a3 = Symbol(42);
  let a4 = Symbol(42);
  console.log(a3 === a4); // false

  // 使用给定的key搜索现有的symbol，如果找到则返回该symbol。否则将使用给定的key在全局symbol注册表中创建一个新的symbol。
  let a5 = Symbol.for('a5');
  let a6 = Symbol.for('a5');
  console.log(a5 === a6); // true

  // 从全局symbol注册表中，为给定的symbol检索一个共享的?symbol key。
  console.log(Symbol.keyFor(a5)); // "a5"
}

{
  let a1 = Symbol.for('abc');
  let obj = {
    [a1]: '123',
    'abc': 345,
    'c': 456
  };
  console.log('obj', obj);

  // Symbol属性时匿名的，是不可枚举的
  for (let [key, value] of Object.entries(obj)) {
    console.log('let of', key, value);
  }

  // 在特定api中才可只枚举Symbol类型
  Object.getOwnPropertySymbols(obj).forEach(function (item) {
    console.log(obj[item]);
  })

  // 在Reflect对象api中即可枚举普通属性，又可枚举Symbol类型属性
  Reflect.ownKeys(obj).forEach(function (item) {
    console.log('ownkeys', item, obj[item]);
  })
}
