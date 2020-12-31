$(function () {
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    $('#link_login').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })
    var form = layui.form
    var layer = layui.layer
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        repwd: function (value) {
            var pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) {
                return '密码不一致'
            }
        }
    })
    
    // $('#form_reg').on('submit', function (e) {
    //     e.preventDefault()
    //     $.ajax({
    //         type: 'POST',
    //         url: 'http://ajax.frontend.itheima.net/api/reguser',
    //         data:{ username: $('#form_reg [name=username]').val(),
    //             password: $('#form_reg [name=password]').val()
    //         },
    //         success: function (res) {
    //             if (res.status !== 0) {
    //                 return layer.msg(res.message)
    //               }
    //            layer.msg('注册成功，请登录！')
    //               // 模拟人的点击行为
    //               $('#link_login').click()
               
    //         }
       
    //    })
    // })
    $('#form_reg').on('submit', function(e) {
      // 1. 阻止默认的提交行为
      e.preventDefault()
      // 2. 发起Ajax的POST请求
      var data = {
        username: $('#form_reg [name=username]').val(),
        password: $('#form_reg [name=password]').val()
      }
      $.post('/api/reguser', data, function(res) {
        if (res.status !== 0) {
          return layer.msg(res.message)
        }
        layer.msg('注册成功，请登录！')
        // 模拟人的点击行为
        $('#link_login').click()
      })
    })
  $('#form_login').submit(function (e) {
    e.preventDefault()
    $.ajax({
      method: 'POST',
      url: '/api/login',
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('登录失败！')
        }
        layer.msg('登录成功！')
        // 将登录成功得到的 token 字符串，保存到 localStorage 中
        localStorage.setItem('token', res.token)
        // 跳转到后台主页
        location.href = '/index.html'
      }
    })
  })
})
