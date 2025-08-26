import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serveStatic } from 'hono/cloudflare-workers'

const app = new Hono()

// CORSを有効化
app.use('/api/*', cors())

// 静的ファイルの配信
app.use('/static/*', serveStatic({ root: './public' }))

// お問い合わせフォーム送信API
app.post('/api/contact', async (c) => {
  const body = await c.req.json()
  
  // 簡単なバリデーション
  if (!body.name || !body.email || !body.message) {
    return c.json({ error: 'すべての必須項目を入力してください' }, 400)
  }
  
  // ここで実際のメール送信やデータベース保存を行う
  // 現時点では成功レスポンスを返す
  console.log('Contact form submission:', body)
  
  return c.json({ 
    success: true, 
    message: 'お問い合わせを受け付けました。担当者より3営業日以内にご連絡いたします。' 
  })
})

// メインページ
app.get('/', (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="ja">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>ケアウィーブ株式会社 | 企業と働く人を支える介護相談サービス</title>
        <meta name="description" content="突然の介護にも、相談できる安心を。ケアウィーブ株式会社は企業向け介護相談サービスを提供し、従業員の介護と仕事の両立を支援します。">
        <meta name="keywords" content="介護相談,企業福利厚生,仕事と介護の両立,介護離職防止,ケアマネージャー">
        
        <!-- Google Fonts -->
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;600;700&display=swap" rel="stylesheet">
        
        <!-- TailwindCSS -->
        <script src="https://cdn.tailwindcss.com"></script>
        
        <!-- Font Awesome -->
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        
        <!-- カスタムCSS -->
        <link href="/static/styles.css" rel="stylesheet">
    </head>
    <body>
        <!-- ヘッダー -->
        <header class="header">
            <div class="header-container">
                <a href="#" class="logo">
                    <img src="https://page.gensparksite.com/v1/base64_upload/6edc59f0926c1b490b7c0a34b90a478c" 
                         alt="CareWeave ケアウィーブ株式会社" class="logo-image">
                </a>
                
                <nav>
                    <ul class="nav-menu">
                        <li><a href="#about">代表挨拶</a></li>
                        <li><a href="#mission">ミッション</a></li>
                        <li><a href="#services">サービス</a></li>
                        <li><a href="#case-study">事例</a></li>
                        <li><a href="#company">会社概要</a></li>
                        <li><a href="#contact">お問い合わせ</a></li>
                    </ul>
                    <button class="mobile-menu-toggle">
                        <i class="fas fa-bars"></i>
                    </button>
                </nav>
            </div>
        </header>

        <!-- メインコンテンツ -->
        <main class="main-content">
            <!-- ヒーローセクション -->
            <section class="hero">
                <div class="hero-container">
                    <div class="hero-logo">
                        <img src="https://page.gensparksite.com/v1/base64_upload/6edc59f0926c1b490b7c0a34b90a478c" 
                             alt="CareWeave ケアウィーブ株式会社" class="hero-logo-image">
                    </div>
                    
                    <h1 class="hero-catchphrase">
                        突然の介護にも、<br>相談できる安心を。
                    </h1>
                    
                    <p class="hero-description">
                        企業と働く人を支える介護相談サービスです
                    </p>
                    
                    <a href="#contact" class="cta-button">
                        <i class="fas fa-envelope mr-2"></i>
                        お問い合わせ
                    </a>
                </div>
            </section>

            <!-- 代表挨拶 -->
            <section id="about" class="section">
                <div class="section-container">
                    <h2 class="section-title">代表挨拶</h2>
                    <p class="section-subtitle">
                        介護現場と経営現場の両方を知る私たちだからこそ、<br>
                        真に必要とされるサービスを提供できると信じています。
                    </p>
                    
                    <div class="profile-grid">
                        <!-- 山口元紀 代表取締役 -->
                        <div class="profile-card">
                            <div class="profile-image">山</div>
                            <h3 class="profile-name">山口 元紀</h3>
                            <p class="profile-title">代表取締役</p>
                            <p class="profile-credentials">
                                介護支援専門員・介護福祉士<br>
                                認知症ケア専門士・産業ケアマネ
                            </p>
                            <div class="profile-description">
                                <p>介護現場を管理し、多くのご利用者やご家族とコミュニケーションを重ねてきました。現場で培った経験を活かし、介護に悩む人のいない社会を目指してまいります。</p>
                                <br>
                                <p>介護は突然やってきます。その時に適切な情報と支援があれば、多くの方が仕事を続けながら介護に向き合えると確信しています。</p>
                            </div>
                        </div>
                        
                        <!-- 中園達洋 取締役 -->
                        <div class="profile-card">
                            <div class="profile-image">中</div>
                            <h3 class="profile-name">中園 達洋</h3>
                            <p class="profile-title">取締役</p>
                            <p class="profile-credentials">
                                金属加工業・IT業 経営者
                            </p>
                            <div class="profile-description">
                                <p>経営の現場で「介護が企業リスクになる現実」を数多く見てきました。優秀な人材が介護を理由に離職していく様子を目の当たりにし、何か手を打たなければならないと強く感じていました。</p>
                                <br>
                                <p>介護と仕事の両立を支える仕組みを社会に広げることで、企業も働く人も安心できる社会を実現したいと考えています。</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- ミッション・ビジョン -->
            <section id="mission" class="section" style="background: var(--light-background);">
                <div class="section-container">
                    <div class="section-catchphrase">
                        「介護の不安を減らせば、働く力はもっと強くなる。」
                    </div>
                    
                    <div class="card-grid">
                        <div class="card">
                            <div class="card-icon">
                                <i class="fas fa-bullseye"></i>
                            </div>
                            <h3 class="card-title">ミッション</h3>
                            <div class="card-content">
                                <p>介護に悩む人のいない社会を目指す</p>
                                <br>
                                <p>介護は人生において避けて通れない課題です。しかし、適切な情報と支援があれば、必要以上に悩む必要はありません。私たちは専門知識と経験を活かし、一人ひとりの状況に寄り添った支援を提供します。</p>
                            </div>
                        </div>
                        
                        <div class="card">
                            <div class="card-icon">
                                <i class="fas fa-eye"></i>
                            </div>
                            <h3 class="card-title">ビジョン</h3>
                            <div class="card-content">
                                <p>従業員一人ひとりが安心して働き続けられる企業文化を広げる</p>
                                <br>
                                <p>介護離職を防ぐことは、企業にとっても働く人にとってもメリットがあります。介護に対する理解と支援体制を整えることで、誰もが安心して働ける職場環境の実現を目指します。</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- 事業内容・サービス -->
            <section id="services" class="section">
                <div class="section-container">
                    <h2 class="section-title">事業内容</h2>
                    <p class="section-subtitle">
                        企業様のニーズに合わせた包括的な介護支援サービスを提供します
                    </p>
                    
                    <!-- サービスアイコン画像 -->
                    <div class="service-icons-container">
                        <img src="https://cdn1.genspark.ai/user-upload-image/4_generated/bb805366-c3c5-43ae-9e40-cab6e7d98fac" 
                             alt="サービス内容アイコン" class="service-icons-image">
                    </div>
                    
                    <div class="card-grid">
                        <div class="card">
                            <div class="card-icon">
                                <i class="fab fa-line"></i>
                            </div>
                            <h3 class="card-title">介護相談窓口の設置</h3>
                            <div class="card-content">
                                <p>公式LINEを活用した手軽な相談窓口を設置。従業員の方が気軽に介護に関する相談ができる環境を提供します。専門資格を持つスタッフが迅速かつ的確にお答えします。</p>
                            </div>
                        </div>
                        
                        <div class="card">
                            <div class="card-icon">
                                <i class="fas fa-chalkboard-teacher"></i>
                            </div>
                            <h3 class="card-title">管理職・従業員向け研修</h3>
                            <div class="card-content">
                                <p>導入時に実施する研修プログラム。介護の基礎知識から企業としての対応方法まで、管理職と従業員の双方に必要な知識をお伝えします。</p>
                            </div>
                        </div>
                        
                        <div class="card">
                            <div class="card-icon">
                                <i class="fas fa-chart-bar"></i>
                            </div>
                            <h3 class="card-title">アンケート調査と分析</h3>
                            <div class="card-content">
                                <p>従業員の介護に対する不安や課題を定期的に調査・分析。企業様の実情に合わせた改善提案を行い、より効果的な支援体制を構築します。</p>
                            </div>
                        </div>
                        
                        <div class="card">
                            <div class="card-icon">
                                <i class="fas fa-heart"></i>
                            </div>
                            <h3 class="card-title">福利厚生支援</h3>
                            <div class="card-content">
                                <p>介護関連の福利厚生制度の設計・運用をサポート。法的要件を満たしながら、従業員満足度の向上につながる制度作りをお手伝いします。</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- サービスの流れ -->
            <section class="section service-flow-section">
                <div class="section-container">
                    <div class="section-catchphrase">
                        「介護で辞めない、介護で悩まない職場づくり。」
                    </div>
                    
                    <h2 class="section-title">サービスの流れ</h2>
                    
                    <div class="process-steps">
                        <div class="step">
                            <div class="step-number">1</div>
                            <h3 class="step-title">ご契約・導入準備</h3>
                            <p class="step-description">
                                社内研修で介護知識を共有し、管理職・従業員の理解を深めます。
                            </p>
                        </div>
                        
                        <div class="step">
                            <div class="step-number">2</div>
                            <h3 class="step-title">LINE相談窓口の開設</h3>
                            <p class="step-description">
                                専用のLINE相談窓口を開設し、従業員が気軽に相談できる環境を整備します。
                            </p>
                        </div>
                        
                        <div class="step">
                            <div class="step-number">3</div>
                            <h3 class="step-title">課題の把握・分析</h3>
                            <p class="step-description">
                                アンケート調査により、従業員の介護に対する不安や課題を把握・分析します。
                            </p>
                        </div>
                        
                        <div class="step">
                            <div class="step-number">4</div>
                            <h3 class="step-title">改善提案</h3>
                            <p class="step-description">
                                分析結果に基づき、企業様の実情に合わせた具体的な改善提案を行います。
                            </p>
                        </div>
                        
                        <div class="step">
                            <div class="step-number">5</div>
                            <h3 class="step-title">フォローアップ</h3>
                            <p class="step-description">
                                継続的なサポートにより、制度の定着と効果的な運用を支援します。
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <!-- ケーススタディ -->
            <section id="case-study" class="section">
                <div class="section-container">
                    <h2 class="section-title">ケーススタディ</h2>
                    <p class="section-subtitle">
                        実際の現場で起こりうる場面を想定した事例を紹介します
                    </p>
                    
                    <div class="card-grid">
                        <div class="card">
                            <img src="https://cdn1.genspark.ai/user-upload-image/4_generated/160ac436-cc78-4055-ac94-177713c1fe1e" 
                                 alt="ケーススタディ - 企業介護相談の様子" class="case-study-image">
                            <div class="card-icon">
                                <i class="fas fa-exclamation-triangle"></i>
                            </div>
                            <h3 class="card-title">ケース1：突然の介護</h3>
                            <div class="card-content">
                                <p><strong>状況：</strong>親の介護が急に必要になった従業員</p>
                                <br>
                                <p><strong>課題：</strong>「何から始めればいいかわからない」「仕事との両立が不安」</p>
                                <br>
                                <p><strong>支援内容：</strong>介護保険の申請手続きから、地域の介護サービス情報、勤務時間調整のアドバイスまで総合的にサポート。</p>
                            </div>
                        </div>
                        
                        <div class="card">
                            <img src="https://cdn1.genspark.ai/user-upload-image/4_generated/160ac436-cc78-4055-ac94-177713c1fe1e" 
                                 alt="ケーススタディ - 管理職の支援" class="case-study-image">
                            <div class="card-icon">
                                <i class="fas fa-users"></i>
                            </div>
                            <h3 class="card-title">ケース2：管理職の悩み</h3>
                            <div class="card-content">
                                <p><strong>状況：</strong>管理職が部下をどう支えるか悩む</p>
                                <br>
                                <p><strong>課題：</strong>「介護離職を防ぎたいが、どうサポートすればいいかわからない」</p>
                                <br>
                                <p><strong>支援内容：</strong>管理職向けの介護支援研修と、具体的な部下への対応方法をアドバイス。</p>
                            </div>
                        </div>
                        
                        <div class="card">
                            <img src="https://cdn1.genspark.ai/user-upload-image/4_generated/160ac436-cc78-4055-ac94-177713c1fe1e" 
                                 alt="ケーススタディ - 予防的学習" class="case-study-image">
                            <div class="card-icon">
                                <i class="fas fa-lightbulb"></i>
                            </div>
                            <h3 class="card-title">ケース3：予防的学習</h3>
                            <div class="card-content">
                                <p><strong>状況：</strong>将来に備えて介護知識を身につけたい従業員</p>
                                <br>
                                <p><strong>課題：</strong>「今は介護が必要ないが、将来が不安」</p>
                                <br>
                                <p><strong>支援内容：</strong>介護の基礎知識研修と、いざという時の準備チェックリストを提供。</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- 会社概要 -->
            <section id="company" class="section" style="background: var(--light-background);">
                <div class="section-container">
                    <h2 class="section-title">会社概要</h2>
                    
                    <div class="card" style="max-width: 800px; margin: 0 auto;">
                        <table style="width: 100%; border-collapse: collapse;">
                            <tr style="border-bottom: 1px solid var(--border-color);">
                                <td style="padding: 1rem; font-weight: 600; color: var(--primary-dark-green); width: 30%;">会社名</td>
                                <td style="padding: 1rem;">ケアウィーブ株式会社</td>
                            </tr>
                            <tr style="border-bottom: 1px solid var(--border-color);">
                                <td style="padding: 1rem; font-weight: 600; color: var(--primary-dark-green);">所在地</td>
                                <td style="padding: 1rem;">神奈川県横浜市西区北幸1丁目11番1号 水信ビル7階</td>
                            </tr>
                            <tr style="border-bottom: 1px solid var(--border-color);">
                                <td style="padding: 1rem; font-weight: 600; color: var(--primary-dark-green);">設立</td>
                                <td style="padding: 1rem;">2025年9月</td>
                            </tr>
                            <tr style="border-bottom: 1px solid var(--border-color);">
                                <td style="padding: 1rem; font-weight: 600; color: var(--primary-dark-green);">資本金</td>
                                <td style="padding: 1rem;">400,000円</td>
                            </tr>
                            <tr style="border-bottom: 1px solid var(--border-color);">
                                <td style="padding: 1rem; font-weight: 600; color: var(--primary-dark-green);">役員</td>
                                <td style="padding: 1rem;">代表取締役 山口元紀 / 取締役 中園達洋</td>
                            </tr>
                            <tr>
                                <td style="padding: 1rem; font-weight: 600; color: var(--primary-dark-green);">従業員数</td>
                                <td style="padding: 1rem;">2名（役員のみ）</td>
                            </tr>
                        </table>
                    </div>
                </div>
            </section>

            <!-- お問い合わせ -->
            <section id="contact" class="section">
                <div class="section-container">
                    <h2 class="section-title">お問い合わせ</h2>
                    <p class="section-subtitle">
                        サービスに関するご質問やご相談がございましたら、<br>
                        お気軽にお問い合わせください。
                    </p>
                    
                    <form id="contact-form" class="contact-form">
                        <div class="form-group">
                            <label for="company" class="form-label">
                                会社名 <span style="color: #e53e3e;">*</span>
                            </label>
                            <input type="text" id="company" name="company" class="form-input" required>
                        </div>
                        
                        <div class="form-group">
                            <label for="name" class="form-label">
                                お名前 <span style="color: #e53e3e;">*</span>
                            </label>
                            <input type="text" id="name" name="name" class="form-input" required>
                        </div>
                        
                        <div class="form-group">
                            <label for="email" class="form-label">
                                メールアドレス <span style="color: #e53e3e;">*</span>
                            </label>
                            <input type="email" id="email" name="email" class="form-input" required>
                        </div>
                        
                        <div class="form-group">
                            <label for="phone" class="form-label">電話番号</label>
                            <input type="tel" id="phone" name="phone" class="form-input">
                        </div>
                        
                        <div class="form-group">
                            <label for="employees" class="form-label">従業員数</label>
                            <select id="employees" name="employees" class="form-select">
                                <option value="">選択してください</option>
                                <option value="1-10">1-10名</option>
                                <option value="11-50">11-50名</option>
                                <option value="51-100">51-100名</option>
                                <option value="101-300">101-300名</option>
                                <option value="301-500">301-500名</option>
                                <option value="500+">500名以上</option>
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label for="inquiry-type" class="form-label">お問い合わせ種別</label>
                            <select id="inquiry-type" name="inquiry-type" class="form-select">
                                <option value="">選択してください</option>
                                <option value="service">サービス内容について</option>
                                <option value="pricing">料金について</option>
                                <option value="demo">デモンストレーション希望</option>
                                <option value="consultation">導入相談</option>
                                <option value="other">その他</option>
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label for="message" class="form-label">
                                お問い合わせ内容 <span style="color: #e53e3e;">*</span>
                            </label>
                            <textarea id="message" name="message" class="form-textarea" rows="5" placeholder="ご質問やご相談内容をお聞かせください。" required></textarea>
                        </div>
                        
                        <button type="submit" class="submit-button">
                            <i class="fas fa-paper-plane mr-2"></i>
                            送信する
                        </button>
                    </form>
                </div>
            </section>
        </main>

        <!-- フッター -->
        <footer class="footer">
            <div class="footer-container">
                <div class="footer-content">
                    <div class="footer-section">
                        <h3>ケアウィーブ株式会社</h3>
                        <p>企業と働く人を支える介護相談サービス</p>
                        <br>
                        <p>〒220-0004<br>
                        神奈川県横浜市西区北幸1丁目11番1号<br>
                        水信ビル7階</p>
                    </div>
                    
                    <div class="footer-section">
                        <h3>サービス</h3>
                        <ul>
                            <li>介護相談窓口の設置</li>
                            <li>管理職・従業員向け研修</li>
                            <li>アンケート調査と分析</li>
                            <li>福利厚生支援</li>
                        </ul>
                    </div>
                    
                    <div class="footer-section">
                        <h3>企業情報</h3>
                        <ul>
                            <li>設立：2025年9月</li>
                            <li>資本金：400,000円</li>
                            <li>代表取締役：山口元紀</li>
                            <li>取締役：中園達洋</li>
                        </ul>
                    </div>
                </div>
                
                <div class="footer-bottom">
                    <p>&copy; 2025 ケアウィーブ株式会社. All rights reserved.</p>
                </div>
            </div>
        </footer>

        <script src="/static/app.js"></script>
    </body>
    </html>
  `)
})

export default app