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
    window.app = new Vue({
        el: '#todoapp',
        data: {
            todos,
            currentEditing: null,
            filterStat: 'all'
        },
        // 方法一：计算未完成数据的个数，会把数据缓存起来，计算属性要比方法更高效一些
        computed: {
            leftCount: function () {
                return this.todos.filter(item => !item.completed).length;
            },
            // 根据不同的hash值判断对应的显示页面
            filterTodos: function () {
                switch (this.filterStat) {
                    case 'active':
                        return this.todos.filter(item => !item.completed)
                        break
                    case 'completed':
                        return this.todos.filter(item => item.completed)
                        break
                    default:
                        return this.todos
                        break
                }
            }
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


            },
            // 方法二：通过在methods方法里定义,定义此方法的话数据每次更新都会调用此方法，不推荐
            // leftCount(){
            //     return this.todos.filter(item =>!item.completed).length;
            // }
            //  当按下回车和失去焦点的时候进行数据保存
            saveEdit(item, index, event) {
                //获取文本中输入的数据
                var editText = event.target.value.trim();
                // 非空校验
                // 如果是空需要把整条数据给删除
                if (!editText.length) {
                    return this.todos.splice(index, 1);
                }
                //   如果不是非空字符  就需要把用户输入的内容进行重新赋值
                item.title = editText;
                //去除edit的样式
                this.currentEditing = null;
            }


        }
    })
    window.onhashchange = function () {
        // console.log(window.location.hash);
        var hash = window.location.hash.substr(2) || 'all';
        window.app.filterStat = hash;

    }
    // 页面第一次加载的时候，手动加载一次
    window.onhashchange()
})(Vue)