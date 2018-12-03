# /contents

この中にはmarkdownファイルを入れます。各 markdown ファイルの名前は記事の識別子となります。ここでは慣例に倣い **slag**　と呼ぶことにします。

**/static** の中のファイルは、サイトのルートに配置されます。(例: ソースで **/contents/static/about.md** はビルドで **/about/index.html** となります。.htaccess で index.html はなしに統一するので、**/about/** となります。)

**/articles** の直下のファイルは、**/articles** の中に配置されます。(例: ソースで **/contents/articles/hoge.md** はビルドで **/articles/hoge/index.html** となります。上と同様 index.html はなくなります。)

**/articles** の中にさらにフォルダを作成してその中に `^\d+.*\.md$` の正規表現にマッチするファイル名の markdown を入れると、連載扱いになって先頭の数字の順に並べられます。0または1から始めてください。0または1で始まる拡張子がmdのファイルがなかった場合、そのフォルダは連載扱いになりませんので注意してください。(例: ソースで **/contents/articles/create-website/1scaffolding.md** はビルドで **/articles/create-website/scaffolding/index.html** となります。数字はなくなります。上と同様 index.html はなくなります。)

---

*TODO: 記事に埋め込む画像をそれぞれの記事のためのフォルダを作成し、その中に入れるか記事の markdown ファイルと同じ階層に置き、画像ファイル名の先頭に slag を書き込むかのルールを決定すべき*
