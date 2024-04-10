export const defaultCode = {
  python: `a = int(input())`,
  javscript: `const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
  
rl.on("line", (line) => { 
  rl.close();
});

rl.on('close', () => {
  process.exit();
})
`,
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
}
  `,
};
