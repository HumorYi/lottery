{
  // 大括号表示Unicode字符，只有加上u才能识别
  console.log('a',`\u0061`);
  console.log('s',`\u20BB7`);

  console.log('s',`\u{20BB7}`);


}


{
  // 字符串中字符Unicode码大于0xFFFF时，会进行Unicode码分解，未超过部分算一个字符，超过部分算一个或多个字符
  let s='𠮷';
  console.log('length',s.length); // 2
  console.log('0',s.charAt(0));
  console.log('1',s.charAt(1));
  console.log('at0',s.charCodeAt(0));
  console.log('at1',s.charCodeAt(1));

  // es6推出新版字符串Unicode码正确辨识api，如果一个字符Unicode码超过0xFFFF时，会进行正确识别，不会出现乱码，比如把4个字节正确识别为2个字节读取出正确的Unicode码
  let s1='𠮷a';
  console.log('length',s1.length);
  console.log('code0',s1.codePointAt(0));
  console.log('code0',s1.codePointAt(0).toString(16));
  console.log('code1',s1.codePointAt(1));
  console.log('code2',s1.codePointAt(2));
}

{
  // 解Unicode码
  console.log(String.fromCharCode("0x20bb7"));
  console.log(String.fromCodePoint("0x20bb7"));
}

{
  let str='\u{20bb7}abc';
  // 普通的遍历无法正确识别超过OxFFFF的Unicode码
  for(let i=0;i<str.length;i++){
    console.log('es5',str[i]);
  }

  // let of 迭代器可以正确识别超过OxFFFF的Unicode码
  for(let code of str){
    console.log('es6',code);
  }
}

{
  let str="string";
  console.log('includes',str.includes("c"));
  console.log('start',str.startsWith('str'));
  console.log('end',str.endsWith('ng'));
}

{
  let str="abc";
  console.log(str.repeat(2));
}

{
  let name="list";
  let info="hello world";
  let m=`i am ${name},${info}`;
  console.log(m);
}

{
  // 长度不满足时,前位补字符
  console.log('1'.padStart(2,'0'));
  // 长度不满足时,末位补字符
  console.log('1'.padEnd(2,'0'));
}

{
  let user={
    name:'list',
    info:'hello world'
  };

  // 字符串模板函数调用
  console.log(abc`i am ${user.name},${user.info}`);
  function abc(s,v1,v2){
    console.log(s,v1,v2);
    return s+v1+v2
  }
}

{
  // 把转义字符转换为的普通字符
  console.log(String.raw`Hi\n${1+2}`);
  console.log(`Hi\n${1+2}`);
}
