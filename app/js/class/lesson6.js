{
  // Array.of() 方法创建一个具有可变数量参数的新数组实例，而不考虑参数的数量或类型。
  let arr = Array.of(3,4,7,9,11);
  console.log('arr=',arr);

  let empty=Array.of();
  console.log('empty',empty);
}

{
  // Array.from() 方法从一个类似数组或可迭代对象中创建一个新的，浅拷贝的数组实例。
  let p=document.querySelectorAll('p');
  let pArr=Array.from(p);
  pArr.forEach(function(item){
    console.log(item.textContent);
  });

  console.log(Array.from([1,3,5],function(item){return item*2}));
}

{
  // fill() 方法用一个固定值填充一个数组中从起始索引到终止索引内的全部元素。不包括终止索引
  console.log('fill-7',[1,'a',undefined].fill(7));
  console.log('fill,pos',['a','b','c'].fill(7,1,3));
}

{
  // 获取数组的键值（索引）
  for(let index of ['1','c','ks'].keys()){
    console.log('keys',index);
  }
  // 获取数组的值
  for(let value of ['1','c','ks'].values()){
    console.log('values',value);
  }
  // 获取数组的键值（索引）和值
  for(let [index,value] of ['1','c','ks'].entries()){
    console.log('values',index,value);
  }
}

{
  // copyWithin() 方法浅复制数组的一部分到同一数组中的另一个位置，并返回它，不会改变原数组的长度，但是会直接改变数组。
  console.log([1,2,3,4,5].copyWithin(0,3,4)); // [4, 2, 3, 4, 5]
}

{
  // find() 方法返回数组中满足提供的测试函数的第一个元素的值。否则返回 undefined。
  console.log([1,2,3,4,5,6].find(function(item){return item>3}));

  // findIndex()方法返回数组中满足提供的测试函数的第一个元素的索引。否则返回-1。
  console.log([1,2,3,4,5,6].findIndex(function(item){return item>3}));
}

{
  console.log('number',[1,2,NaN].includes(1));
  console.log('number',[1,2,NaN].includes(NaN));
}
