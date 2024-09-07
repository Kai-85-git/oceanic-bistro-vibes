import { useState, useEffect, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Coffee, Umbrella, Utensils, Send, Instagram, Facebook, Twitter, Menu, X, Sun, Moon, Calendar } from "lucide-react"
import { Link } from "react-router-dom"
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"

const NavLink = ({ href, children }) => (
  <Link to={href} className="text-sm font-medium text-white hover:text-teal-200 transition-colors">
    {children}
  </Link>
)

const FeatureCard = ({ icon: Icon, title, description }) => (
  <motion.div
    className="flex flex-col items-center text-center space-y-4 p-6 bg-white dark:bg-stone-800 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl"
    whileHover={{ scale: 1.05 }}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
  >
    <Icon className="h-12 w-12 text-teal-600 dark:text-teal-400" />
    <h3 className="text-xl font-semibold text-stone-800 dark:text-white">{title}</h3>
    <p className="text-stone-600 dark:text-stone-300">{description}</p>
  </motion.div>
)

const MenuItem = ({ name, price, description, image }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.li 
      className="flex justify-between items-start mb-4 pb-4 border-b border-stone-200 dark:border-stone-700 last:border-b-0 relative overflow-hidden"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="flex-1">
        <h4 className="text-lg font-semibold text-stone-800 dark:text-white">{name}</h4>
        <p className="text-sm text-stone-600 dark:text-stone-400">{description}</p>
      </div>
      <span className="text-teal-600 dark:text-teal-400 font-semibold ml-4">{price}</span>
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="absolute inset-0 bg-teal-600 dark:bg-teal-800 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
          >
            <img src={image} alt={name} className="w-[200px] h-[200px] rounded-lg object-cover" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.li>
  )
}

const TestimonialCard = ({ name, comment }) => (
  <motion.div
    className="bg-white dark:bg-stone-800 p-6 rounded-lg shadow-lg"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
  >
    <p className="text-stone-600 dark:text-stone-300 mb-4">{comment}</p>
    <p className="text-teal-600 dark:text-teal-400 font-semibold">{name}</p>
  </motion.div>
)

const CustomCursor = () => {
  const cursorRef = useRef(null)

  useEffect(() => {
    const moveCursor = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`
        cursorRef.current.style.top = `${e.clientY}px`
      }
    }
    window.addEventListener('mousemove', moveCursor)
    return () => window.removeEventListener('mousemove', moveCursor)
  }, [])

  return (
    <div
      ref={cursorRef}
      className="fixed w-8 h-8 rounded-full border-2 border-teal-600 dark:border-teal-400 pointer-events-none z-50 transition-all duration-100 ease-out"
      style={{ transform: 'translate(-50%, -50%)' }}
    />
  )
}

const ReservationDialog = () => {
  const [date, setDate] = useState(new Date())

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex-1 bg-stone-200 text-stone-800 hover:bg-stone-300 dark:bg-stone-700 dark:text-white dark:hover:bg-stone-600 transition-colors duration-300">
          <Calendar className="mr-2 h-4 w-4" /> 予約
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>テーブルを予約</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <CalendarComponent
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
          />
          <Input type="time" placeholder="時間" />
          <Input type="number" placeholder="人数" min={1} />
          <Textarea placeholder="特別なリクエスト" />
        </div>
        <Button type="submit" className="w-full">予約を確定</Button>
      </DialogContent>
    </Dialog>
  )
}

const OceanViewCafe = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [theme, setTheme] = useState('light')
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
    document.documentElement.classList.toggle('dark')
  }

  return (
    <div className={`flex flex-col min-h-screen bg-stone-50 dark:bg-stone-900 transition-colors duration-300 ${theme}`}>
      <CustomCursor />
      <header className={`px-4 lg:px-6 h-16 flex items-center fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-teal-800/90 dark:bg-stone-800/90 backdrop-blur-md shadow-md' : 'bg-transparent'}`}>
        <Link className="flex items-center justify-center" to="#">
          <Coffee className="h-6 w-6 text-white" />
          <span className="ml-2 text-xl font-bold text-white font-serif">Ocean View Cafe</span>
        </Link>
        <nav className="hidden md:flex ml-auto gap-4 sm:gap-6">
          {["特長", "メニュー", "ギャラリー", "お客様の声", "お問い合わせ"].map((item) => (
            <NavLink key={item} href={`#${item}`}>{item}</NavLink>
          ))}
        </nav>
        <button
          className="ml-4 text-white hover:text-teal-200 transition-colors"
          onClick={toggleTheme}
          aria-label="テーマ切り替え"
        >
          {theme === 'dark' ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
        </button>
        <button className="ml-4 md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="メニューを開く">
          {isMenuOpen ? <X className="h-6 w-6 text-white" /> : <Menu className="h-6 w-6 text-white" />}
        </button>
      </header>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 bg-teal-800/95 dark:bg-stone-800/95 z-40 pt-16 px-4"
          >
            <nav className="flex flex-col items-center gap-4">
              {["特長", "メニュー", "ギャラリー", "お客様の声", "お問い合わせ"].map((item) => (
                <NavLink key={item} href={`#${item}`} onClick={() => setIsMenuOpen(false)}>{item}</NavLink>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
      <main className="flex-1">
        <section className="w-full h-screen relative flex items-center justify-center overflow-hidden">
          <motion.div style={{ opacity }} className="absolute inset-0">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/kai3735_a_wide_beach_seen_through_a_glass_window_calm_morning_6501552d-2ba6-4c96-bf33-9066e2d4a23a_2-EiCAHqf4Hfb0y2ewZsLccDR8shlbYG.png"
              alt="Ocean View Cafe interior and beach view"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </motion.div>
          <div className="relative z-10 text-center space-y-6 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
            <motion.div 
              className="bg-teal-800/80 dark:bg-stone-800/80 backdrop-blur-md p-8 rounded-lg shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter text-white font-serif mb-4">
                Ocean View Cafe
              </h1>
              <p className="text-xl sm:text-2xl md:text-3xl text-white font-light">
                絶景のビーチを眺めながら、最高のひとときを
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Button className="bg-teal-600 text-white hover:bg-teal-700 transition-colors duration-300 text-lg py-6 px-8 rounded-full">
                メニューを見る
              </Button>
            </motion.div>
          </div>
        </section>
        <section id="特長" className="w-full py-24 bg-white dark:bg-stone-900">
          <div className="container px-4 md:px-6 mx-auto">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12 text-stone-800 dark:text-white font-serif">特長</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <FeatureCard 
                icon={Coffee} 
                title="最高品質のコーヒー" 
                description="厳選された豆を使用し、熟練のバリスタが丁寧に淹れます" 
              />
              <FeatureCard 
                icon={Umbrella} 
                title="絶景のロケーション" 
                description="美しいビーチを一望できる、開放的な空間でお過ごしいただけます" 
              />
              <FeatureCard 
                icon={Utensils} 
                title="こだわりの料理" 
                description="地元の新鮮な食材を使用した、美味しい料理をご提供します" 
              />
            </div>
          </div>
        </section>
        <section id="メニュー" className="w-full py-24 bg-stone-100 dark:bg-stone-800">
          <div className="container px-4 md:px-6 mx-auto">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12 text-stone-800 dark:text-white font-serif">メニュー</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="bg-white dark:bg-stone-700 p-8 rounded-lg shadow-md">
                <h3 className="text-2xl font-semibold mb-6 text-stone-800 dark:text-white">ドリンク</h3>
                <ul>
                  <MenuItem 
                    name="スペシャルティコーヒー" 
                    price="¥600" 
                    description="厳選された豆を使用した、深みのある味わい" 
                    image="/placeholder.svg?height=200&width=200"
                  />
                  <MenuItem 
                    name="抹茶ラテ" 
                    price="¥650" 
                    description="濃厚な抹茶と滑らかなミルクの絶妙なハーモニー" 
                    image="/placeholder.svg?height=200&width=200"
                  />
                  <MenuItem 
                    name="フルーツスムージー" 
                    price="¥700" 
                    description="季節の新鮮なフルーツを使用した爽やかな一杯" 
                    image="/placeholder.svg?height=200&width=200"
                  />
                  <MenuItem 
                    name="オーガニックハーブティー" 
                    price="¥550" 
                    description="心落ち着く香りと味わいのハーブティー" 
                    image="/placeholder.svg?height=200&width=200"
                  />
                </ul>
              </div>
              <div className="bg-white dark:bg-stone-700 p-8 rounded-lg shadow-md">
                <h3 className="text-2xl font-semibold mb-6 text-stone-800 dark:text-white">フード</h3>
                <ul>
                  <MenuItem 
                    name="アボカドサーモントースト" 
                    price="¥1,200" 
                    description="新鮮なサーモンとクリーミーなアボカドの贅沢な一皿" 
                    image="/placeholder.svg?height=200&width=200"
                  />
                  <MenuItem 
                    name="シーフードパエリア" 
                    price="¥1,800" 
                    description="地中海の風味豊かな具材がたっぷりの本格パエリア" 
                    image="/placeholder.svg?height=200&width=200"
                  />
                  <MenuItem 
                    name="アサイーボウル" 
                    price="¥1,100" 
                    description="栄養満点のスーパーフード、アサイーを使ったヘルシーな一品" 
                    image="/placeholder.svg?height=200&width=200"
                  />
                  <MenuItem 
                    name="季節のフルーツパンケーキ" 
                    price="¥1,300" 
                    description="ふわふわのパンケーキに旬のフルーツをたっぷりと" 
                    image="/placeholder.svg?height=200&width=200"
                  />
                </ul>
              </div>
            </div>
          </div>
        </section>
        <section id="ギャラリー" className="w-full py-24 bg-white dark:bg-stone-900">
          <div className="container px-4 md:px-6 mx-auto">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12 text-stone-800 dark:text-white font-serif">ギャラリー</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <motion.div
                  key={i}
                  className="relative aspect-square overflow-hidden rounded-lg"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src={`/placeholder.svg?height=300&width=300&text=Gallery+Image+${i}`}
                    alt={`Gallery Image ${i}`}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        <section id="お客様の声" className="w-full py-24 bg-stone-100 dark:bg-stone-800">
          <div className="container px-4 md:px-6 mx-auto">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12 text-stone-800 dark:text-white font-serif">お客様の声</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <TestimonialCard
                name="田中 さくら"
                comment="海を眺めながらのコーヒーは最高でした。スタッフの方々も親切で、素晴らしい時間を過ごせました。"
              />
              <TestimonialCard
                name="鈴木 健太"
                comment="料理がとても美味しく、特にシーフードパエリアは絶品でした。また家族で訪れたいです。"
              />
            </div>
          </div>
        </section>
        <section id="お問い合わせ" className="w-full py-24 bg-white dark:bg-stone-900">
          <div className="container px-4 md:px-6 mx-auto">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12 text-stone-800 dark:text-white font-serif">お問い合わせ</h2>
            <form className="max-w-md mx-auto space-y-6">
              <Input placeholder="お名前" className="bg-stone-50 dark:bg-stone-700 border-stone-200 dark:border-stone-600" aria-label="お名前" />
              <Input type="email" placeholder="メールアドレス" className="bg-stone-50 dark:bg-stone-700 border-stone-200 dark:border-stone-600" aria-label="メールアドレス" />
              <Textarea placeholder="メッセージ" className="bg-stone-50 dark:bg-stone-700 border-stone-200 dark:border-stone-600" aria-label="メッセージ" />
              <div className="flex gap-4">
                <Button className="flex-1 bg-teal-600 text-white hover:bg-teal-700 transition-colors duration-300">
                  <Send className="mr-2 h-4 w-4" /> 送信
                </Button>
                <ReservationDialog />
              </div>
            </form>
          </div>
        </section>
      </main>
      <footer className="bg-teal-800 dark:bg-stone-800 text-white py-12">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Ocean View Cafe</h3>
              <p className="text-sm text-teal-200 dark:text-stone-300">最高のコーヒーと絶景をお楽しみください。</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">営業時間</h3>
              <p className="text-sm text-teal-200 dark:text-stone-300">毎日: 7:00 - 21:00</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">フォローする</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-white hover:text-teal-200 dark:hover:text-stone-300 transition-colors" aria-label="Instagram">
                  <Instagram className="h-6 w-6" />
                </a>
                <a href="#" className="text-white hover:text-teal-200 dark:hover:text-stone-300 transition-colors" aria-label="Facebook">
                  <Facebook className="h-6 w-6" />
                </a>
                <a href="#" className="text-white hover:text-teal-200 dark:hover:text-stone-300 transition-colors" aria-label="Twitter">
                  <Twitter className="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-teal-700 dark:border-stone-700 text-center text-sm text-teal-200 dark:text-stone-400">
            © 2023 Ocean View Cafe. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}

export default OceanViewCafe