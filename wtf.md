# redis-npm is so slow
For some reason, the redis-npm package are making the postgres init so slow. Before, the postgres was needing something about 174ms, but now, it's getting 1.4 seconds (more then 8 times). I will investigate it, and, if i find a solution, i will put it here

I was not able to found out the problem, i try to change the redis' connection package and it work very well, so, i concluded that the problem was with the redis-npm package.

