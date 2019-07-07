{
  // 简洁表示法
  let o=1;
  let k=2;
  let es5={
    o:o,
    k:k
  };
  // 属性名和值变量同名时，可只写一个
  let es6={
    o,
    k
  };
  console.log(es5,es6);

  let es5_method={
    hello:function(){
      console.log('hello');
    }
  };

  // 属性值为method时，可取消:function
  let es6_method={
    hello(){
      console.log('hello');
    }
  };
  console.log(es5_method.hello(),es6_method.hello());
}

{
  // 属性表达式
  let a='b';
  let es5_obj={
    a:'c',
    b:'c'
  };

  let es6_obj={
    [a]:'c'
  }

  console.log(es5_obj,es6_obj);

}

{
  // 判断两个元素的是否相等
  console.log('字符串',Object.is('abc','abc'),'abc'==='abc');
  console.log('数组',Object.is([],[]),[]===[]);

  // 把后面的所有对象成员拷贝到第一个对象中，同名会覆盖
  console.log('拷贝',Object.assign({a:'a'},{b:'b'}));

  let test={k:123,o:456};
  // 获取对象的键名和键值
  for(let [key,value] of Object.entries(test)){
    console.log([key,value]);
  }
}

{
  // 扩展运算符
  let {a,b,...c}={a:'test',b:'kill',c:'ddd',d:'ccc'};
  console.log(a, b, c);
  // c={
  //   c:'ddd',
  //   d:'ccc'
  // }
}
