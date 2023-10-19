attribute vec4 a_position;
attribute vec2 a_texCoord;
attribute vec4 a_color;

//uniform float ratioX; //牌初始状态到搓牌最终位置的完成度比例
uniform float ratioY; //牌初始状态到搓牌最终位置的完成度比例
uniform float radius; //搓牌类似于绕圆柱滚起，其圆柱的半径
//uniform float width;
uniform float height;
//uniform float finish; //是否完成搓牌
uniform float depthOffset;
uniform float anchorY;
uniform float rubOffset;
uniform float maxRubAngle;

uniform mat4 vpMatrix;
uniform mat4 modelMatrix;

#ifdef GL_ES
varying lowp vec4 v_fragmentColor;
varying mediump vec2 v_texCoord;
#else
varying vec4 v_fragmentColor;
varying vec2 v_texCoord;
#endif

varying vec4 v_position;
varying float finalAngle;

void main()
{
    //注意OpenGL-ES中：1.attribute修饰的变量是常量。2.没有自动转类型float a = 1;或者5.0/3都是错误的
    //这两个问题改了两天，可以通过修改CPP代码，打印log来调试cocos2dx程序
    vec4 tmp_pos = a_position;

    float tempAngle = 1.0;

        
    tmp_pos.xyz = (modelMatrix * vec4(tmp_pos.xyz, 0.0)).xyz;
    float pi = 3.14159;
    float halfPeri = radius * pi * maxRubAngle; //
    float rubLenght = height * (ratioY - anchorY);
    tmp_pos.y += height*rubOffset;
    float tempPosY = tmp_pos.y;
    if(tmp_pos.y < rubLenght)
    {
            float dy = (rubLenght - tmp_pos.y);
        if(rubLenght - halfPeri < tmp_pos.y)
        {
            float angle = dy/radius;
            tmp_pos.y = rubLenght -  sin(angle)*radius;
            tmp_pos.z = radius * (1.0- cos(angle)); 
        }
        else
        {
            float tempY = rubLenght  - halfPeri - tmp_pos.y;
            float tempAngle = pi * (1.0-maxRubAngle);
            tmp_pos.y = rubLenght - radius*sin(tempAngle) + tempY * cos(tempAngle);
            tmp_pos.z = radius + radius*cos(tempAngle) + tempY * sin(tempAngle);

        }

    }
    tmp_pos.x += modelMatrix[3][0];
    tmp_pos.y += modelMatrix[3][1];
    tmp_pos.z += modelMatrix[3][2];


    vec4 pos = vpMatrix  * tmp_pos;


    float tempOffset = depthOffset*pos.w;
    if (tempPosY < rubLenght )
    {
        float dy = (rubLenght - tempPosY);
        //float angle = dy/radius;
        if( dy > pi* 0.3 * radius)
        {
            tempOffset = -tempOffset*2.0;
        }
    }

    pos.z = pos.z + tempOffset;

    gl_Position = pos;
    

    
    finalAngle = tempAngle;
    //vec4 pos = CC_MVPMatrix  * tmp_pos;

    v_texCoord = a_texCoord;
}