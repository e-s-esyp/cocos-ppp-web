varying vec4 v_fragmentColor;
varying vec2 v_texCoord;
varying float finalAngle;

uniform int useMask;
uniform sampler2D  maskTexture;

void main()
{

    vec4 color = texture2D(CC_Texture0, v_texCoord);

    if(color.w < 0.9)
    {
        discard;
    }

    vec2 scale = vec2(0.16, 0.16);
    vec2 offset = vec2(0.033, 0.015);

    if(useMask != 0 && offset.x < v_texCoord.x && v_texCoord.x < offset.x+scale.x && offset.y < v_texCoord.y && v_texCoord.y < offset.y+scale.y)
    {
        //6.67 = 1/scale.x
        //6.67 = 1/scale.y
        vec4 tempColor = texture2D(maskTexture, vec2((v_texCoord.x-offset.x)*6.67, (v_texCoord.y-offset.y)*6.67));
        if(tempColor.a > 0.9)
        {
            color = tempColor;
        }

    }


    gl_FragColor = color;

   // gl_FragColor = vec4(1.0,1.0,1.0, 1.0);
    
}