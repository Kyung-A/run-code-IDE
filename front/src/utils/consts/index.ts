export const defaultCode = {
  python: `a = int(input())`,
  javscript: `const input = require("fs").readFileSync("/dist/input.txt").toString().trim();`,
  java: `import java.util.Scanner;

  public class Main {
    public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
  }
}`,
  cpp: `#include <iostream>
  using namespace std;
  
  int main(){
      int a, b;
  }`,
};
