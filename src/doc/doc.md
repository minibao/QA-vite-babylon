碰撞统计表

<<<　alien >>>
collisionGroup = 2
collisionMask = 17

<<<　alien-bullet >>>
collisionGroup = 8
collisionMask = 17

<<<　ship >>>
collisionGroup = 2

<<<　play >>>
collisionGroup = 1
collisionMask = 1

<<<　play-bullet >>>
collisionGroup = 4
collisionMask = 18


<<<　barrier >>>
collisionGroup = 16
collisionResponse = false 碰撞了也不会有任何反应
collisionRetryCount = 10

<<<　barrier-brick >>>
collisionGroup = 16
collisionResponse = false
collisionRetryCount = 10


1、collisionMask 优先级高：collisionMask 属性决定了一个物体可以与哪些碰撞组发生碰撞。如果一个物体的 collisionMask 不包含另一个物体的 collisionGroup，那么它们之间将不会发生碰撞，即使它们的 collisionGroup 是相同的。

2、collisionGroup 优先级低：collisionGroup 属性定义了物体属于哪个碰撞组。当进行碰撞检测时，Babylon.js 首先会检查 collisionMask，根据其中的位掩码来确定哪些碰撞组可以相互碰撞，然后再根据 collisionGroup 来判断具体的碰撞发生。



