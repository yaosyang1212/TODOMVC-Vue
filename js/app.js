; (function (vue) {
    // 模拟假数据
    const todos = [
        {
            id: 1,
            title: 'Angular',
            completed: false
        },
        {
            id: 2,
            title: 'Vue',
            completed: true
        },
        {
            id: 3,
            title: 'React',
            completed: true
        }
    ]
    new Vue({
        el: '#todoapp',
        data: {
            todos,
        },
        methods: {
            // 添加数据
            // addmessage:function(){

            // }在ES6中可以简写成如下
            addmessage(event) {
                // console.log('11');
                // console.log(event.target.value);
                //1、获取数组对象中的每个元素
                var text = event.target.value.trim();
                // console.log(text);

                var id = this.todos[this.todos.length - 1].id + 1;
                // console.log(id);

                // 每次输入都是未完成的状态
                // 2、判断用户是否输入了文本
                // 2.1  可以通过text的length如果为0则不做操作，
                if (!text.length) {
                    return
                }
                // 2.2  text的length的长度不为0则添加到数组中
                this.todos.push({
                    id,
                    title: text,
                    completed: false
                })
                event.target.value = '';
            },
            // 点击全选按钮进行反选
            toggleall(event) {
                // console.log(event.target.checked);
                // 每个的状态true和false赋值给每个li
                this.todos.forEach(element =>
                    element.completed = event.target.checked
                );

            },
            // 点击按钮删除单条数据
            removeid(delindex) {
                this.todos.splice(delindex, 1)
            },
            // 清除所有完成的
            clearCompleted() {
                // console.log('heheehe');
                // 过滤未完成的数据
                // this.todos = this.todos.filter((item)=>{
                //     return !item.completed
                // })可以简写成如下代码
                // this.todos = this.todos.filter(item => !item.completed)

                for (let i = 0; i < todos.length; i++) {
                    if (this.todos[i].completed) {
                        this.todos.splice(i, 1);
                        i--;
                    }
                }


            }

        }
    })
})(Vue)