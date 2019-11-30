{-# LANGUAGE OverloadedStrings #-}

import Web.AppM
import System.Process

main = do
  putStrLn "本地语音播报服务启动: localhost:7766/yourcontent"
  run 7766 $ toApplication $ app

app :: AppIO
app = do
  v <- consumV
  liftIO $ putStrLn v
  liftIO $ callCommand $ "say \"" ++ filter (/='"') v ++ "\""
  respLTS status200 ""
