#!/bin/bash

file=$1;
if [ $# -eq 0 ]; then
  echo "Missing argument! syntax '$0 <obj file>'";
  exit 1;
fi

content=`cat $file`;

vertices=`cat $file | grep '^v ' | sed 's,v ,,' |  sed 's/ /, /g' | \
  sed 's/$/,/' | sed 's,^,  ,'`;

normals=`cat $file | grep '^vn ' | sed 's,vn ,,' |  sed 's/ /, /g' | \
  sed 's/$/,/' | sed 's,^,  ,'`;

vertexPositions=`cat $file | grep '^f' | sed 's,f ,,' | sed 's,//[0-9]*,,g'`;


echo "verticesData = [";
echo "$vertices";
echo "],"

echo "normalsData = [";
echo "$normals";
echo "],"

echo "vertexPositionsData = [";
index=0
for pos in $vertexPositions; do
  index=$((index+1));
  if [ $((index % 3)) -eq 1 ];then
    echo -n "  ";
  fi
  echo -n "$((pos-1))";
  if [ $((index % 3)) -gt 0 ];then
    echo -n ", ";
  fi
  if [ $((index % 3)) -eq 0 ];then
    echo ",";
  fi
done
echo "];"

exit 0;
