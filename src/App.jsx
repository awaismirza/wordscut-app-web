import { useEffect } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { wordsCut } from './data/product-sites/wordsCut.js'
import { ProductSiteLayout } from './components/product/ProductSiteLayout.jsx'
import { WordsCutLandingPage } from './components/product/WordsCutLandingPage.jsx'
import { ProductDocPage } from './components/product/ProductDocPage.jsx'
import { ProductSupportPage } from './components/product/ProductSupportPage.jsx'

function RestoreScroll() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) document.getElementById(hash.slice(1))?.scrollIntoView()
    else window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
}
function LegacyLink() {
  const location = useLocation()
  const suffix = location.pathname.replace(/^\/products\/(?:wordscut|yusafcut)/, '') || '/'
  return <Navigate replace to={`${suffix}${location.search}${location.hash}`} />
}
export default function App() {
  return <><RestoreScroll /><Routes>
    <Route element={<ProductSiteLayout />}>
      <Route index element={<WordsCutLandingPage site={wordsCut} />} />
      <Route path="privacy" element={<ProductDocPage kind="privacy" />} />
      <Route path="terms" element={<ProductDocPage kind="terms" />} />
      <Route path="support" element={<ProductSupportPage />} />
      <Route path="products/wordscut/*" element={<LegacyLink />} />
      <Route path="products/yusafcut/*" element={<LegacyLink />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Route>
  </Routes></>
}
