
function Print(name, level, type, parentType)
{
    if (typeof(name) !== 'string')
    {
        console.log('Error Name Format!');
    }

    if (typeof(level) !== 'number')
    {
        console.log('Error Level Format!');
    }

    if (typeof(type) !== 'string')
    {
        console.log('Error Type Format!');
    }

    if (typeof(parentType) !== 'string')
    {
        console.log('Error ParentType Format!');
    }

    var linkerHead = "";
    var linker = " ";
    if (type === 'normal')
    {
        linkerHead = '├';
    }
    else if (type === 'end')
    {
        linkerHead = '└';
    }
    else
    {
        console.log('Error Type Format!');
    }

    var total = "";
    var tmp = 0;

    if (parentType === 'normal')
    {
        tmp = level - 1;
    }
    else if (parentType === 'end')
    {
        tmp = level;
    }
    else
    {
        console.log('Error ParentType Format!');
    }

    for(var i = 0; i < tmp; i++)
    {
        total+=linker;
    }

    if (parentType === 'normal')
    {
        console.log('│'+total+linkerHead+'── '+name);
    }
    else if (parentType === 'end')
    {
        console.log(total+linkerHead+'── '+name);
    }
    else
    {
        console.log('Error ParentType Format!');
    }
}

exports.Print = Print;

function GetFileInfor(uuid)
{

}

function Traversal()
{

}

//Print('haha',5,'normal','end')
//Print('sdfdf',5,'end','normal')
