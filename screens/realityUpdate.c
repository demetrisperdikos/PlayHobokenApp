#include <stdio.h>
#include <stdlib.h>

void reality_1_example_1();
void reality_1_example_2();
void reality_3();
double fun();

typedef struct {
  int a[2];
  double d;
} struct_t;

int main(int argc,char **argv) {
  int n;            /* used to loop for reality_3() */

  reality_1_example_1();
  reality_1_example_2();

  if (argc==1) n = 5;        /* default 5 iter */
  else n = atoi(argv[1]);
  reality_3(n);

  return 0;
}

void reality_1_example_1(){
    float f=50000;
    int i=40000;
    int result;

    printf("reality_1_example_1_float: f=%f\n", f);
    if (f*f >= 0)
        printf("f*f=%f >= 0\n", f*f);
    else
        printf("f*f=%f < 0\n", f*f);

    printf("reality_1_example_1_int: i=%d\n", i);
    result = i*i;
    if (result >= 0)
        printf("i*i=%d >= 0\n", result);
    else
        printf("i*i=%d < 0\n", result);

    i = 50000;
    printf("reality_1_example_1_int: i=%d\n", i);
    result = i*i;
    if (result >= 0)
        printf("i*i=%d >= 0\n", result);
    else
        printf("i*i=%d < 0\n", result);
}



void reality_1_example_2(){
    float fx=1e20, fy=-1e20, fz=3.14;
    unsigned int uix=12, uiy=34, uiz=56;
    int six=12, siy=34, siz=56;

    printf("reality_1_example_2_float: fx=%e fy=%e fz=%f\n", fx, fy, fz);
    if((fx+fy)+fz == fx+(fy+fz)){
        printf("((fx+fy)+fz)=%e == (fx+(fy+fz))=%e\n", (fx+fy)+fz, fx+(fy+fz));
        }
    else{
        printf("((fx+fy)+fz)=%e != (fx+(fy+fz))=%e\n", (fx+fy)+fz, fx+(fy+fz));
}
    printf("reality_1_example_2_unsigned: uix=%u uiy=%u uiz=%u\n", uix, uiy, uiz);
    if ((uix+uiy)+uiz == uix+(uiy+uiz)){
        printf("((uix+uiy)+uiz)=%u == (uix+(uiy+uiz))=%u\n", (uix+uiy)+uiz, uix+(uiy+uiz));
        }
    else{
        printf("((uix+uiy)+uiz)=%u != (uix+(uiy+uiz))=%u\n", (uix+uiy)+uiz, uix+(uiy+uiz));
}
    printf("reality_1_example_2_signed: six=%d siy=%d siz=%d\n", six, siy, siz);
    if ((six+siy)+siz == six+(siy+siz)){
        printf("((six+siy)+siz)=%d == (six+(siy+siz))=%d\n", (six+siy)+siz, six+(siy+siz));
    }
    else{
        printf("((six+siy)+siz)=%d != (six+(siy+siz))=%d\n", (six+siy)+siz, six+(siy+siz));
}
}

void reality_3(int n) {
  double d;
  int i;  
  printf("reality_3: n=5 iterations\n");
  for(i=0; i<n; i++)
  {
    d=fun(i);
  }

}

double fun(int i){
  volatile struct_t s;

  s.d = 3.14;
  s.a[i] = 1073741824;
  printf("fun(%d) -> %f\n",i,s.d);  

  return s.d;
}